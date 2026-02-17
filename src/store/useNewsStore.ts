import {create}  from 'zustand'
import { $apiClient } from '@/shared/api/api_client';
import { logger } from '@/shared/lib/logger';
import { cache, createCacheKey } from '@/shared/lib/cache';
export interface Category {
  uuid: string;
  name: string;
  name_kg: string;
  name_en: string;
  slug: string;
  description: string;
  description_kg: string;
  description_en: string;
  color?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  uuid: string;
  name: string;
  slug: string;
}

export interface NewsItem {
  author_name: string;
  category: Category | null;
  created_at: string;
  excerpt: string;
  featured_image: string | null;
  is_featured: boolean;
  is_pinned: boolean;
  published_at: string;
  reading_time: number;
  slug: string;
  status: string;
  tags: Tag[];
  thumbnail: string | null;
  title: string;
  updated_at: string;
  uuid: string;
  video_url: string;
  views_count: number;
}

export interface Categories {
  categories?: string;
  locale?: string;
  search?: string;
  ordering?: string;
}

export interface NewsStoreState {
  news: NewsItem[] | null;
  newsDetal: NewsItem | null;
  loading: boolean;
  error: string | null;
  fetchNews: (params?: Categories) => Promise<void>;
}


const useNewsStore = create<NewsStoreState>((set) => ({
  news: null,
  newsDetal: null,
  loading: false,
  error: null,
  
  fetchNews: async (params?: Categories) => {
    set({ loading: true, error: null });
    try {
      const searchParams = new URLSearchParams();
      
      if (params?.locale) {
        searchParams.append('lang', params.locale);
      }
      
      if (params?.search) {
        searchParams.append('search', params.search);
      }
      
      if (params?.categories) {
        searchParams.append('categories', params.categories);
      }
      
      if (params?.ordering) {
        searchParams.append('featured_sort', params.ordering);
      }
      
      const url = `/news/news/?${searchParams.toString()}`;
      
      // Проверяем кэш (только для запросов без поиска, чтобы всегда показывать актуальные результаты поиска)
      const cacheKey = createCacheKey('news', params);
      if (!params?.search) {
        const cachedData = cache.get<NewsItem[]>(cacheKey);
        if (cachedData) {
          set({ news: cachedData, loading: false });
          return;
        }
      }
      
      const res = await $apiClient.get<NewsItem[]>(url);
      if (res.success && res.data) {
        // Кэшируем только если нет поиска (поиск должен быть всегда актуальным)
        if (!params?.search) {
          cache.set(cacheKey, res.data, 5 * 60 * 1000); // 5 минут
        }
        set({ news: res.data, loading: false });
      } else {
        set({ error: "Ошибка при загрузке новостей", loading: false });
      }
    } catch (error) {
      logger.error("Error fetching news", error);
      set({ error: "Ошибка при загрузке новостей", loading: false });
    }
  },
}));

export default useNewsStore;
