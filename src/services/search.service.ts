import { $apiClient } from '@/shared/api/api_client';
import { SearchResponse, SearchParams } from '@/shared/types/search';
import { logger } from '@/shared/lib/logger';

class SearchService {
  async search(params: SearchParams): Promise<SearchResponse | null> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('q', params.query);
      
      if (params.page) {
        queryParams.append('page', params.page.toString());
      }
      
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      
      if (params.type) {
        queryParams.append('type', params.type);
      }

      const response = await $apiClient.get<SearchResponse>(
        `/common/search/?${queryParams.toString()}`
      );

      if (response.success && response.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      logger.error('Search service error', error);
      return null;
    }
  }

  async searchPost(params: SearchParams): Promise<SearchResponse | null> {
    try {
      const response = await $apiClient.post<SearchParams, SearchResponse>(
        '/common/search/',
        params
      );

      if (response.success && response.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      logger.error('Search service error', error);
      return null;
    }
  }
}

export const searchService = new SearchService();
