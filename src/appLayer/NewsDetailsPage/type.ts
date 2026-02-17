export interface NewsImage {
  image: string;
  caption: string;
  is_main: boolean;
}

export interface NewsTag {
  uuid: string;
  name: string;
  slug: string;
  color: string;
  is_active: boolean;
  created_at: string;
}

export interface NewsCategory {
  uuid: string;
  name: string;
  name_en: string;
  name_kg: string;
  slug: string;
  description: string;
  description_en: string;
  description_kg: string;
  color: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  uuid: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_name: string;
  category: NewsCategory | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: string;
  is_featured: boolean;
  is_pinned: boolean;
  reading_time: number;
  views_count: number;
  images: NewsImage[];
  tags: NewsTag[];
  related_news: NewsItem[]; // если возвращает вложенные новости
  video_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  social_title: string;
  social_description: string;
  social_image: string | null;
}
