'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './SearchInput.module.scss';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Link } from '@/i18n/navigation';
  
interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder,
  onSearch,
  autoFocus = false,
  debounceMs = 500
}) => {
  const t = useTranslations('searchPage');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce для поискового запроса
  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Автоматический поиск при изменении debounced запроса
  useEffect(() => {
    if (debouncedQuery.trim()) {
      if (onSearch) {
        onSearch(debouncedQuery.trim());
      } else {
        // По умолчанию перенаправляем на страницу поиска
        router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
      }
    }
  }, [debouncedQuery, onSearch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('');
      inputRef.current?.blur();
    }
  };

  return (
    <form
      className={`${styles.searchForm} ${className || ''}`}
      onSubmit={handleSubmit}
    >
      <div className={`${styles.searchInputWrapper} ${isFocused ? styles.focused : ''}`}>
        <Link href="/search">
          <SearchIcon className={styles.searchIcon} />
        </Link>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('placeholder')}
          className={styles.searchInput}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className={styles.clearButton}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
