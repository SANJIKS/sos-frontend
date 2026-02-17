import { useRef, useCallback } from 'react';

/**
 * Кастомный хук для throttle
 * @param callback - функция для throttle
 * @param delay - задержка в миллисекундах
 * @returns throttled функция
 */
export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        callback(...args);
      } else {
        // Отменяем предыдущий отложенный вызов
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Планируем вызов после истечения задержки
        timeoutRef.current = setTimeout(() => {
          lastRun.current = Date.now();
          callback(...args);
        }, delay - (now - lastRun.current));
      }
    }) as T,
    [callback, delay]
  );
}

