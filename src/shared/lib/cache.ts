/**
 * Простая система кэширования для API запросов
 */

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number; // Time to live в миллисекундах
}

class Cache {
    private cache: Map<string, CacheEntry<unknown>> = new Map();
    private defaultTTL = 5 * 60 * 1000; // 5 минут по умолчанию

    /**
     * Получить данные из кэша
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key) as CacheEntry<T> | undefined;
        
        if (!entry) {
            return null;
        }

        // Проверяем, не истек ли срок действия
        const now = Date.now();
        if (now - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    /**
     * Сохранить данные в кэш
     */
    set<T>(key: string, data: T, ttl?: number): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: ttl || this.defaultTTL,
        });
    }

    /**
     * Удалить данные из кэша
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Очистить весь кэш
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Очистить устаревшие записи
     */
    cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > entry.ttl) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Установить TTL по умолчанию
     */
    setDefaultTTL(ttl: number): void {
        this.defaultTTL = ttl;
    }
}

// Singleton экземпляр
export const cache = new Cache();

// Периодическая очистка устаревших записей (каждые 10 минут)
if (typeof window !== 'undefined') {
    setInterval(() => {
        cache.cleanup();
    }, 10 * 60 * 1000);
}

/**
 * Создать ключ кэша из параметров
 */
export function createCacheKey(prefix: string, params?: unknown): string {
    if (!params || typeof params !== 'object' || params === null) {
        return prefix;
    }
    
    // Преобразуем в Record для работы с любыми объектами
    const paramsRecord = params as Record<string, unknown>;
    
    const keys = Object.keys(paramsRecord);
    if (keys.length === 0) {
        return prefix;
    }
    
    const sortedParams = keys
        .sort()
        .map(key => `${key}=${String(paramsRecord[key])}`)
        .join('&');
    
    return `${prefix}?${sortedParams}`;
}

