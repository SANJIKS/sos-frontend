import { useState, useEffect, useRef } from 'react';

interface ContainerSize {
  width: number;
  height: number;
}

/**
 * Хук для отслеживания размеров контейнера
 * @param defaultWidth - ширина по умолчанию
 * @param defaultHeight - высота по умолчанию
 * @returns размеры контейнера и ref для элемента
 */
export function useContainerSize(
  defaultWidth: number = 1200,
  defaultHeight: number = 600
): [ContainerSize, React.RefObject<HTMLDivElement | null>] {
  const [size, setSize] = useState<ContainerSize>({
    width: defaultWidth,
    height: defaultHeight
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    // Обновляем размеры при монтировании
    updateSize();

    // Создаем ResizeObserver для отслеживания изменений размеров
    const resizeObserver = new ResizeObserver(updateSize);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Также слушаем изменения размера окна
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return [size, containerRef];
}
