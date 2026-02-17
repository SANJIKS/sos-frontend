export interface SearchResult {
  type: 'news' | 'program' | 'vacancy' | 'about' | 'page';
  title: string;
  title_highlighted: string;
  description: string;
  description_highlighted: string;
  url: string;
  created_at: string;
  relevance_score: number;
}

export interface SearchResponse {
  query: string;
  total_results: number;
  results: SearchResult[];
}

export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  type?: string;
}

export interface SearchFilters {
  type?: 'news' | 'program' | 'vacancy' | 'about' | 'page' | '';
  dateFrom?: string;
  dateTo?: string;
}
