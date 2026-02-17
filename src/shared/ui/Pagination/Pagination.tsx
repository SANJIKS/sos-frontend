'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}) => {
  const t = useTranslations('searchPage.pagination');

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Максимальное количество видимых страниц

    if (totalPages <= maxVisible) {
      // Показываем все страницы
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показываем с многоточиями
      if (currentPage <= 3) {
        // Начало списка
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Конец списка
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Середина списка
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={handlePrevious}
        disabled={currentPage === 1 || disabled}
        aria-label={t('previous')}
        title={t('previous')}
      >
        ←
      </button>

      <div className={styles.pages}>
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                className={`${styles.button} ${styles.page} ${
                  page === currentPage ? styles.active : ''
                }`}
                onClick={() => handlePageClick(page)}
                disabled={disabled}
              >
                {page}
              </button>
            ) : (
              <span className={styles.ellipsis}>{page}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={handleNext}
        disabled={currentPage === totalPages || disabled}
        aria-label={t('next')}
        title={t('next')}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;

