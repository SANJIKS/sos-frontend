import type { AxiosError } from 'axios';
import type { ApiError, FieldErrors } from '@/shared/types/api_types';

/**
 * Обрабатывает ошибки Axios и преобразует их в стандартизированный формат
 */
export function handleApiError(error: unknown): ApiError | FieldErrors | string {
    if (!error || typeof error !== 'object') {
        return 'Что-то пошло не так';
    }

    // Обработка Axios ошибок
    if ('isAxiosError' in error && error.isAxiosError) {
        const axiosError = error as AxiosError;
        
        // Ошибка с ответом от сервера
        if (axiosError.response) {
            const { data, status } = axiosError.response;
            
            // Ошибки валидации (обычно 400)
            if (status === 400 && data && typeof data === 'object') {
                // Проверяем, является ли это объектом с ошибками полей
                const errorData = data as Record<string, unknown>;
                const hasFieldErrors = Object.keys(errorData).some(
                    key => Array.isArray(errorData[key])
                );
                
                if (hasFieldErrors) {
                    return errorData as FieldErrors;
                }
            }
            
            // Ошибка авторизации
            if (status === 401) {
                return {
                    message: 'Требуется авторизация',
                    code: 'UNAUTHORIZED'
                };
            }
            
            // Ошибка доступа
            if (status === 403) {
                return {
                    message: 'Доступ запрещен',
                    code: 'FORBIDDEN'
                };
            }
            
            // Ошибка сервера
            if (status >= 500) {
                return {
                    message: 'Ошибка сервера. Попробуйте позже',
                    code: 'SERVER_ERROR'
                };
            }
            
            // Общая ошибка с данными от сервера
            if (data && typeof data === 'object') {
                if ('detail' in data && typeof data.detail === 'string') {
                    return data.detail;
                }
                if ('message' in data && typeof data.message === 'string') {
                    return data.message;
                }
            }
        }
        
        // Ошибка сети
        if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
            return {
                message: 'Превышено время ожидания. Проверьте подключение к интернету',
                code: 'TIMEOUT'
            };
        }
        
        if (axiosError.message) {
            return axiosError.message;
        }
    }
    
    // Обработка обычных ошибок
    if ('message' in error && typeof error.message === 'string') {
        return error.message;
    }
    
    return 'Что-то пошло не так';
}

/**
 * Проверяет, является ли ошибка объектом с ошибками полей
 */
export function isFieldErrors(error: unknown): error is FieldErrors {
    if (!error || typeof error !== 'object') {
        return false;
    }
    
    return Object.values(error).every(
        value => Array.isArray(value) && value.every(item => typeof item === 'string')
    );
}

/**
 * Преобразует ошибку в строку для отображения пользователю
 */
export function getErrorMessage(error: unknown): string {
    const handledError = handleApiError(error);
    
    if (typeof handledError === 'string') {
        return handledError;
    }
    
    if (isFieldErrors(handledError)) {
        const firstError = Object.values(handledError)[0];
        return Array.isArray(firstError) ? firstError[0] : 'Ошибка валидации';
    }
    
    if ('message' in handledError) {
        return handledError.message;
    }
    
    return 'Что-то пошло не так';
}

