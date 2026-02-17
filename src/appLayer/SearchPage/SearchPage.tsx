'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styles from './SearchPage.module.scss';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { searchService } from '@/services/search.service';
import { SearchResult } from '@/shared/types/search';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useContainerSize } from '@/shared/hooks/useContainerSize';
import VirtualizedCardList from './components/VirtualizedCardList';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { logger } from '@/shared/lib/logger';

const SearchPage: React.FC = () => {
  const t = useTranslations('searchPage');
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  const [, containerRef] = useContainerSize(1200, 600);

  const handleSearch = useCallback(async (query: string, page: number = 1, append: boolean = false) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setError(null);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setHasSearched(true);
      setError(null);
    }

    try {
      const response = await searchService.search({
        query: query.trim(),
        page,
        limit: 12
      });

      if (response) {
        if (append) {
          setSearchResults(prev => [...prev, ...response.results]);
        } else {
          setSearchResults(response.results);
        }
        setTotalResults(response.total_results);
        setCurrentPage(page);
        setTotalPages(Math.ceil(response.total_results / 12));
        setHasMore(response.results.length === 12 && searchResults.length + response.results.length < response.total_results);
      } else {
        if (!append) {
          setError('Ошибка при выполнении поиска');
          setSearchResults([]);
          setTotalResults(0);
        }
      }
    } catch (err) {
      logger.error('Search error', err);
      if (!append) {
        setError('Произошла ошибка при поиске. Попробуйте еще раз.');
        setSearchResults([]);
        setTotalResults(0);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchResults.length]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      handleSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
      setHasSearched(false);
      setError(null);
      setTotalResults(0);
      setHasMore(false);
    }
  }, [debouncedSearchQuery, handleSearch]);

  const loadMoreResults = useCallback(() => {
    if (hasMore && !isLoadingMore && debouncedSearchQuery.trim()) {
      handleSearch(debouncedSearchQuery, currentPage + 1, true);
    }
  }, [hasMore, isLoadingMore, debouncedSearchQuery, currentPage, handleSearch]);

  const handlePageChange = useCallback((page: number) => {
    if (debouncedSearchQuery.trim()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      handleSearch(debouncedSearchQuery, page, false);
    }
  }, [debouncedSearchQuery, handleSearch]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder={t('placeholder')}
              value={searchQuery}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.resultsSection}>
          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{t('loading')}</p>
            </div>
          )}

          {!isLoading && hasSearched && searchResults.length === 0 && !error && (
            <div className={styles.noResults}>
              <SearchIcon className={styles.noResultsIcon} />
              <h3>{t('noResults.title')}</h3>
              <p>{t('noResults.description')}</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <SearchIcon className={styles.errorIcon} />
              <h3>Ошибка поиска</h3>
              <p>{error}</p>
              <button 
                className={styles.retryButton}
                onClick={() => handleSearch(searchQuery)}
              >
                Попробовать снова
              </button>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <h2>{t('results.title')}</h2>
                <span className={styles.resultsCount}>
                  {totalResults} {t('results.count')}
                </span>
              </div>

              <div 
                ref={containerRef}
                className={styles.virtualizedResultsContainer}
              >
                <VirtualizedCardList
                  results={searchResults}
                  hasMore={hasMore}
                  isLoadingMore={isLoadingMore}
                  onLoadMore={loadMoreResults}
                />
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={isLoading}
                />
              )}
            </div>  
          )}

          {!hasSearched && (
            <div className={styles.initialState}>
              <SearchIcon className={styles.initialIcon} />
              <h3>{t('initial.title')}</h3>
              <p>{t('initial.description')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;




