import {create} from 'zustand'
import {
    changePassword,
    forgotPassword,
    getUserProfile,
    IChangeDto,
    ILoginDto,
    IRegisterDto,
    IResetPasswordDto,
    IVerifyAccountDto,
    loginUser,
    registerUser,
    resetPassword,
    verifyAccount
} from '@/services/auth.service'
import {IResponse, FieldErrors} from '@/shared/types/api_types'
import { setAccessToken, setRefreshToken, removeAllTokens, getAccessToken, getRefreshToken } from '@/shared/lib/cookies'
import { handleApiError, isFieldErrors } from '@/shared/lib/errorHandler'
import { logger } from '@/shared/lib/logger'

interface User {
    email: string;
    first_name: string;
    last_name: string;
    phone: number;
}

interface AuthState {
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean;
    user: User | null
    loading: boolean;
    error: FieldErrors | null;
    email: string;

    register: (dto: IRegisterDto) => Promise<IResponse<unknown> | undefined>;
    login: (dto: ILoginDto) => Promise<IResponse<unknown> | undefined>
    logout: () => void;
    verifyAccount: (dto: IVerifyAccountDto) => Promise<IResponse<unknown> | undefined>;
    initializeAuth: () => Promise<void>;
    changePassword: (dto: IChangeDto) => Promise<IResponse<unknown> | undefined>;
    forgotPassword: (email: string) => Promise<IResponse<unknown> | undefined>;
    resetPassword: (dto: IResetPasswordDto) => Promise<IResponse<unknown> | undefined>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    email: '',

    register: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await registerUser(dto)
            if (res.success) {
                set({loading: false, email: dto.email})
            } else {
                const error = handleApiError(res.error);
                if (isFieldErrors(error)) {
                    set({error: error, loading: false})
                } else {
                    set({error: {general: [typeof error === 'string' ? error : 'Ошибка регистрации']}, loading: false})
                }
            }
            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Registration error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    verifyAccount: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await verifyAccount(dto)

            if (res.success) {
                set({loading: false})
            } else {
                const error = handleApiError(res.error);
                if (isFieldErrors(error)) {
                    set({error: error, loading: false})
                } else {
                    set({error: {general: [typeof error === 'string' ? error : 'Неверный код']}, loading: false})
                }
            }
            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Verify account error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    initializeAuth: async () => {
        const token = getAccessToken();
        const refresh = getRefreshToken();
        
        if (!token) {
            set({isAuthenticated: false, token: null, refreshToken: null, user: null});
            return;
        }

        try {
            const profileRes = await getUserProfile()
            if (profileRes.success && profileRes.data) {
                set({
                    token,
                    refreshToken: refresh || null,
                    isAuthenticated: true,
                    user: profileRes.data as User
                })
            } else {
                removeAllTokens();
                set({isAuthenticated: false, token: null, refreshToken: null, user: null})
            }
        } catch (error) {
            logger.error('Initialize auth error', error);
            removeAllTokens();
            set({isAuthenticated: false, token: null, refreshToken: null, user: null})
        }
    },

    login: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await loginUser(dto) as IResponse<{ access: string; refresh: string }>

            if (res.success && res.data?.access) {
                // Сохраняем токены с безопасными настройками
                setAccessToken(res.data.access);
                if (res.data.refresh) {
                    setRefreshToken(res.data.refresh);
                }
                
                set({
                    loading: false, 
                    token: res.data.access,
                    refreshToken: res.data.refresh || null,
                    isAuthenticated: true
                });
                
                await get().initializeAuth()
            } else {
                const error = handleApiError(res.error);
                const errorObj = isFieldErrors(error)
                    ? error
                    : {general: [typeof error === 'string' ? error : 'Ошибка входа']};

                set({error: errorObj, loading: false})
            }

            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Login error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    changePassword: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await changePassword(dto) as IResponse<unknown>

            if (res.success) {
                set({loading: false})
            } else {
                const error = handleApiError(res.error);
                const errorObj = isFieldErrors(error)
                    ? error
                    : {general: [typeof error === 'string' ? error : 'Ошибка при смене пароля']};

                set({error: errorObj, loading: false})
            }

            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Change password error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    forgotPassword: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await forgotPassword(dto) as IResponse<unknown>

            if (res.success) {
                set({loading: false})
            } else {
                const error = handleApiError(res.error);
                const errorObj = isFieldErrors(error)
                    ? error
                    : {general: [typeof error === 'string' ? error : 'Ошибка при восстановлении пароля']};
                set({error: errorObj, loading: false})
            }

            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Forgot password error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    resetPassword: async (dto) => {
        set({loading: true, error: null})
        try {
            const res = await resetPassword(dto) as IResponse<unknown>

            if (res.success) {
                set({loading: false})
            } else {
                const error = handleApiError(res.error);
                const errorObj = isFieldErrors(error)
                    ? error
                    : {general: [typeof error === 'string' ? error : 'Ошибка при сбросе пароля']};

                set({error: errorObj, loading: false})
            }

            return res
        } catch (err) {
            const error = handleApiError(err);
            const message = typeof error === 'string' ? error : 'Что-то пошло не так';
            logger.error('Reset password error', err);
            set({error: {general: [message]}, loading: false})
        }
    },

    logout: () => {
        removeAllTokens();
        set({token: null, refreshToken: null, isAuthenticated: false, user: null})
    }
}))
