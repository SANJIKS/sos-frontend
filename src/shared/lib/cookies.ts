import Cookies from 'js-cookie';

/**
 * Безопасные настройки для cookies
 */
const getCookieOptions = () => {
    const isSecure = typeof window !== 'undefined' 
        ? (typeof process !== 'undefined' && process.env.NODE_ENV === 'production' || window.location.protocol === 'https:')
        : (typeof process !== 'undefined' && process.env.NODE_ENV === 'production');
    
    return {
        secure: isSecure,
        sameSite: 'strict' as const,
        path: '/',
    };
};

/**
 * Сохраняет токен доступа в cookie с безопасными настройками
 */
export function setAccessToken(token: string, expiresInDays: number = 7): void {
    Cookies.set('token', token, {
        ...getCookieOptions(),
        expires: expiresInDays,
    });
}

/**
 * Сохраняет refresh token в cookie с безопасными настройками
 */
export function setRefreshToken(token: string, expiresInDays: number = 30): void {
    Cookies.set('refresh_token', token, {
        ...getCookieOptions(),
        expires: expiresInDays,
    });
}

/**
 * Получает токен доступа из cookie
 */
export function getAccessToken(): string | undefined {
    return Cookies.get('token');
}

/**
 * Получает refresh token из cookie
 */
export function getRefreshToken(): string | undefined {
    return Cookies.get('refresh_token');
}

/**
 * Удаляет токен доступа
 */
export function removeAccessToken(): void {
    Cookies.remove('token', { path: '/' });
}

/**
 * Удаляет refresh token
 */
export function removeRefreshToken(): void {
    Cookies.remove('refresh_token', { path: '/' });
}

/**
 * Удаляет все токены
 */
export function removeAllTokens(): void {
    removeAccessToken();
    removeRefreshToken();
}

