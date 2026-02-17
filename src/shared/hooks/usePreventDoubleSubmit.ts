import { useRef, useCallback } from 'react';

/**
 * Хук для предотвращения двойной отправки форм
 * @param submitFn - функция отправки
 * @param delay - минимальная задержка между отправками в миллисекундах (по умолчанию 2000мс)
 * @returns функция отправки с защитой от двойных кликов
 */
export function usePreventDoubleSubmit<T extends (...args: any[]) => Promise<any>>(
  submitFn: T,
  delay: number = 2000
): T {
  const isSubmitting = useRef<boolean>(false);
  const lastSubmitTime = useRef<number>(0);

  return useCallback(
    (async (...args: Parameters<T>) => {
      const now = Date.now();
      
      // Проверяем, не слишком ли рано после последней отправки
      if (isSubmitting.current || now - lastSubmitTime.current < delay) {
        return;
      }

      isSubmitting.current = true;
      lastSubmitTime.current = now;

      try {
        return await submitFn(...args);
      } finally {
        // Сбрасываем флаг после задержки
        setTimeout(() => {
          isSubmitting.current = false;
        }, delay);
      }
    }) as T,
    [submitFn, delay]
  );
}
