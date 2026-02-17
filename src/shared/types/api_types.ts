export interface IDictionary {
    [id: string]: string | number | boolean | null
}

/**
 * Структурированная ошибка API
 */
export interface ApiError {
    message: string;
    code?: string;
    field?: string;
    details?: Record<string, string[]>;
}

/**
 * Ошибка валидации полей
 */
export interface FieldErrors {
    [field: string]: string[];
}

/**
 * Стандартизированный ответ API
 */
export interface IResponse<T> {
    success: boolean
    data: T | null
    error?: ApiError | FieldErrors | string | null
}

export enum CONTENT_TYPE {
    JSON = 'application/json',
    FORM_DATA = 'multipart/form-data'
}
