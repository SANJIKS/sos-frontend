import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { CONTENT_TYPE, IResponse, ApiError, FieldErrors } from '../types/api_types'
import { handleApiError, isFieldErrors } from '../lib/errorHandler'
import { logger } from '../lib/logger'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeAllTokens } from '../lib/cookies'

/**
 * Интерфейс для ответа с токенами
 */
interface TokenResponse {
    access: string;
    refresh: string;
}

class ApiClient {
    private axios: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value?: unknown) => void;
        reject: (error?: unknown) => void;
    }> = [];

    constructor(baseURL?: string, token?: string) {
        const apiUrl = baseURL || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : undefined) || 'https://api.sos-kyrgyzstan.org/api/v1';
        
        this.axios = axios.create({
            baseURL: apiUrl,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            timeout: 30000, // 30 секунд
        });

        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    /**
     * Настройка interceptor для запросов
     */
    private setupRequestInterceptor(): void {
        this.axios.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (typeof window !== 'undefined') {
                    const currentToken = getAccessToken();
                    const currentLang = Cookies.get('NEXT_LOCALE') || 'ru';

                    // Добавляем токен
                    if (currentToken) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = `Bearer ${currentToken}`;
                    }

                    // ✅ ИСПРАВЛЕНИЕ: Добавляем lang через params
                    // Это безопасно и не ломает baseURL
                    config.params = config.params || {};
                    config.params['lang'] = currentLang;
                }
                return config;
            },
            (error) => {
                logger.error('Request interceptor error', error);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Настройка interceptor для ответов
     */
    private setupResponseInterceptor(): void {
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError<unknown>) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                // Обработка 401 - неавторизован
                if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Если уже идет обновление токена, добавляем запрос в очередь
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        })
                            .then(() => {
                                return this.axios(originalRequest);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const refreshToken = getRefreshToken();
                        if (!refreshToken) {
                            throw new Error('No refresh token available');
                        }

                        // Обновляем токен
                        const response = await axios.post<TokenResponse>(
                            `${this.axios.defaults.baseURL}/auth/refresh/`,
                            { refresh: refreshToken }
                        );

                        const { access, refresh } = response.data;
                        setAccessToken(access);
                        if (refresh) {
                            setRefreshToken(refresh);
                        }

                        // Обновляем заголовок для оригинального запроса
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${access}`;
                        }

                        // Обрабатываем очередь запросов
                        this.processQueue(null);

                        // Повторяем оригинальный запрос
                        return this.axios(originalRequest);
                    } catch (refreshError) {
                        // Если обновление токена не удалось, очищаем токены и перенаправляем на логин
                        this.processQueue(refreshError);
                        removeAllTokens();
                        
                        // Перенаправление на страницу логина (если доступно)
                        if (typeof window !== 'undefined') {
                            window.location.href = '/login';
                        }
                        
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Обработка других ошибок
                logger.error('API request failed', {
                    url: originalRequest?.url,
                    method: originalRequest?.method,
                    status: error.response?.status,
                    error: error.message,
                });

                return Promise.reject(error);
            }
        );
    }

    /**
     * Обработка очереди запросов после обновления токена
     */
    private processQueue(error: unknown): void {
        this.failedQueue.forEach((promise) => {
            if (error) {
                promise.reject(error);
            } else {
                promise.resolve();
            }
        });
        this.failedQueue = [];
    }

    /**
     * Создает стандартизированный ответ
     */
    private createResponse<T>(success: boolean, data: T | null, error?: unknown): IResponse<T> {
        if (success) {
            return {
                success: true,
                data: data as T,
                error: null,
            };
        }

        const handledError = handleApiError(error);
        return {
            success: false,
            data: null,
            error: handledError,
        };
    }

    /**
     * Извлекает сообщение об ошибке из ответа
     */
    private extractErrorMessage(error: unknown): ApiError | FieldErrors | string {
        return handleApiError(error);
    }

    async get<TOut>(url: string): Promise<IResponse<TOut>> {
        try {
            const res = await this.axios.get<TOut>(url);
            return this.createResponse<TOut>(true, res.data);
        } catch (error) {
            return this.createResponse<TOut>(false, null, error);
        }
    }

    async post<TIn, TOut>(
        url: string,
        data: TIn,
        contentType: CONTENT_TYPE = CONTENT_TYPE.JSON
    ): Promise<IResponse<TOut>> {
        try {
            const headers: { [key: string]: string } = {};
            
            // Для FormData не устанавливаем Content-Type, браузер установит его автоматически с boundary
            if (contentType !== CONTENT_TYPE.FORM_DATA && !(data instanceof FormData)) {
                headers['Content-Type'] = contentType;
            }

            const res = await this.axios.post<TOut>(url, data, { headers });
            return this.createResponse<TOut>(true, res.data);
        } catch (error) {
            return this.createResponse<TOut>(false, null, error);
        }
    }

    async put<TIn, TOut>(
        url: string,
        data: TIn,
        contentType: CONTENT_TYPE = CONTENT_TYPE.JSON
    ): Promise<IResponse<TOut>> {
        try {
            const res = await this.axios.put<TOut>(url, data, {
                headers: { 'Content-Type': contentType },
            });
            return this.createResponse<TOut>(true, res.data);
        } catch (error) {
            return this.createResponse<TOut>(false, null, error);
        }
    }

    async patch<TIn, TOut>(
        url: string,
        data: TIn,
        contentType: CONTENT_TYPE = CONTENT_TYPE.JSON
    ): Promise<IResponse<TOut>> {
        try {
            const res = await this.axios.patch<TOut>(url, data, {
                headers: { 'Content-Type': contentType },
            });
            return this.createResponse<TOut>(true, res.data);
        } catch (error) {
            return this.createResponse<TOut>(false, null, error);
        }
    }

    async delete<TOut>(url: string): Promise<IResponse<TOut>> {
        try {
            const res = await this.axios.delete<TOut>(url);
            return this.createResponse<TOut>(true, res.data);
        } catch (error) {
            return this.createResponse<TOut>(false, null, error);
        }
    }
}

// Экспортируем экземпляр
export const $apiClient = new ApiClient();
