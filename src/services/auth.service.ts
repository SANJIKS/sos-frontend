import {$apiClient} from '@/shared/api/api_client'
import { IResponse } from '@/shared/types/api_types'

export interface IRegisterDto {
    email: string;
    password?: string;
    password_confirm?: string;
    first_name: string;
    last_name: string;
    phone: string;
    consent_data_processing: boolean;
}

export interface IVerifyAccountDto {
    email: string;
    code: string;
}

export interface ILoginDto {
    email: string;
    password: string;
}

export interface ISendCodeDto {
    auth_method: 'email';
}

export interface IUserProfile {
    email: string;
    first_name: string;
    last_name: string;
    phone: number;
}

export interface IChangeDto {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export interface IResetPasswordDto {
    token: string;
    new_password: string;
    confirm_password: string;
}

export interface IRefreshTokenDto {
    refresh: string;
}

export interface ILoginResponse {
    access: string;
    refresh: string;
}

export const registerUser = async (dto: IRegisterDto): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/auth/register/', dto);
};

export const verifyAccount = async (dto: IVerifyAccountDto): Promise<IResponse<unknown>> => {
    const res = await $apiClient.post('/auth/verify-account/', dto);
    if (res.success) {
        return { success: true, data: res.data, error: null };
    }
    return { success: false, data: null, error: res.error || 'Неверный код' };
};

export const send2FACode = async (dto: ISendCodeDto): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/auth/2fa/send-code/', dto);
};

export const loginUser = async (dto: ILoginDto): Promise<IResponse<ILoginResponse>> => {
    return await $apiClient.post<ILoginDto, ILoginResponse>('/auth/login/', dto);
};

export const logoutUser = async (): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/auth/logout/', {});
};

export const getUserProfile = async (): Promise<IResponse<IUserProfile>> => {
    const res = await $apiClient.get<IUserProfile>('/users/profile/');
    if (res.success && res.data) {
        return { success: true, data: res.data, error: null };
    }
    return { success: false, data: null, error: res.error || 'Ошибка при получении профиля' };
};

export const changePassword = async (dto: IChangeDto): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/users/profile/change-password/', dto);
};

export const forgotPassword = async (email: string): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/auth/forgot-password/', { email });
};

export const resetPassword = async (dto: IResetPasswordDto): Promise<IResponse<unknown>> => {
    return await $apiClient.post('/auth/reset-password/', dto);
};

export const refreshToken = async (dto: IRefreshTokenDto): Promise<IResponse<ILoginResponse>> => {
    return await $apiClient.post<IRefreshTokenDto, ILoginResponse>('/auth/refresh/', dto);
}
