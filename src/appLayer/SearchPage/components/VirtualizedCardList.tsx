'use client';

import React, { memo, useState, useEffect, useRef } from 'react';
import { SearchResult } from '@/shared/types/search';
import { useTranslations } from 'next-intl';
import styles from './VirtualizedCardList.module.scss';

interface VirtualizedCardListProps {
  results: SearchResult[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

interface CardItemProps {
  result: SearchResult;
}

const CardItem = memo<CardItemProps>(({ result }) => {
  const t = useTranslations('searchPage');

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news':
        return t('types.news');
      case 'program':
        return t('types.program');
      case 'vacancy':
        return t('types.vacancy');
      case 'about':
        return t('types.about');
      default:
        return t('types.page');
    }
  };

  const renderHighlightedText = (text: string, highlightedText: string) => {
    // Если сервер уже предоставил выделенный текст, используем его
    if (highlightedText && highlightedText !== text) {
      // Обернем в стили для желтого выделения
      const styledText = highlightedText.replace(
        /<mark>/g, 
        '<mark style="background-color: #fff3cd; padding: 0 2px; font-weight: normal;">'
      );
      return <span dangerouslySetInnerHTML={{ __html: styledText }} />;
    }
    
    // Иначе используем обычный текст
    return text;
  };

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          <a href={result.url} className={styles.cardLink}>
            {renderHighlightedText(result.title, result.title_highlighted)}
          </a>
        </h3>
        <p className={styles.cardDescription}>
          {renderHighlightedText(result.description, result.description_highlighted)}
        </p>
        <div className={styles.cardMeta}>
          <span className={styles.typeLabel}>{getTypeLabel(result.type)}</span>
          {result.created_at && (
            <span className={styles.date}>
              {new Date(result.created_at).toLocaleDateString('ru-RU')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

CardItem.displayName = 'CardItem';

const VirtualizedCardList: React.FC<VirtualizedCardListProps> = ({
  results,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore
}) => {
  const [visibleCount, setVisibleCount] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);

  // Определяем количество колонок в зависимости от ширины контейнера
  // const getColumnsPerRow = (width: number) => {
  //   if (width >= 1200) return 3;
  //   if (width >= 800) return 2;
  //   return 1;
  // };
  const visibleResults = results.slice(0, visibleCount);

  // Обработчик прокрутки для бесконечной загрузки
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
    
    if (isNearBottom && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    } else if (isNearBottom && visibleCount < results.length) {
      setVisibleCount(prev => Math.min(prev + 12, results.length));
    }
  };

  // Сброс видимого количества при изменении результатов
  useEffect(() => {
    setVisibleCount(12);
  }, [results.length]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={styles.virtualizedContainer}
      onScroll={handleScroll}
    >
      <div className={styles.cardsGrid}>
        {visibleResults.map((result, index) => (
          <CardItem
            key={`${result.type}-${index}`}
            result={result}
          />
        ))}
      </div>
      {isLoadingMore && (
        <div className={styles.loadingMore}>
          <div className={styles.spinner}></div>
          <span>Загрузка дополнительных результатов...</span>
        </div>
      )}
    </div>
  );
};

export default VirtualizedCardList;
