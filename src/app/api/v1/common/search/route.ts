import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/shared/lib/logger';

// Типы для поиска
interface SearchResult {
  type: 'news' | 'program' | 'vacancy' | 'about' | 'page';
  title: string;
  title_highlighted: string;
  description: string;
  description_highlighted: string;
  url: string;
  created_at: string;
  relevance_score: number;
}

interface SearchResponse {
  query: string;
  total_results: number;
  results: SearchResult[];
}

// Моковые данные для демонстрации
const mockData: SearchResult[] = [
  {
    type: 'news',
    title: 'Year her reflect never vote magazine coach.',
    title_highlighted: 'Year her reflect never vote magazine coach.',
    description: 'Eye set take heart off out ever.',
    description_highlighted: 'Eye set take heart off out ever.',
    url: 'http://sos-kyrgyzstan.org/api/v1/news/news-86-17048/',
    created_at: '2025-10-07T09:10:17.057265+00:00',
    relevance_score: 1
  },
  {
    type: 'news',
    title: 'Grow later attention only throughout.',
    title_highlighted: 'Grow later attention only throughout.',
    description: 'Side analysis responsibility determine bank.',
    description_highlighted: 'Side analysis responsibility determine bank.',
    url: 'http://sos-kyrgyzstan.org/api/v1/news/news-63-16373/',
    created_at: '2025-10-07T09:10:16.381491+00:00',
    relevance_score: 1
  },
  {
    type: 'news',
    title: 'Begin quickly major social.',
    title_highlighted: 'Begin quickly major social.',
    description: 'Debate tell memory ever water civil cause.',
    description_highlighted: 'Debate tell memory ever water civil cause.',
    url: 'http://sos-kyrgyzstan.org/api/v1/news/news-60-16284/',
    created_at: '2025-10-07T09:10:16.292292+00:00',
    relevance_score: 1
  },
  {
    type: 'news',
    title: 'Perhaps father area line high.',
    title_highlighted: 'Perhaps father area line high.',
    description: 'Field watch store scene energy.',
    description_highlighted: 'Field watch store scene energy.',
    url: 'http://sos-kyrgyzstan.org/api/v1/news/news-54-16100/',
    created_at: '2025-10-07T09:10:16.108206+00:00',
    relevance_score: 1
  },
  {
    type: 'program',
    title: 'Новая программа поддержки детей',
    title_highlighted: 'Новая программа поддержки детей',
    description: 'Мы запускаем новую программу для поддержки детей в трудной жизненной ситуации.',
    description_highlighted: 'Мы запускаем новую программу для поддержки детей в трудной жизненной ситуации.',
    url: '/programs/1',
    created_at: '2024-01-15T00:00:00.000Z',
    relevance_score: 0.9
  },
  {
    type: 'vacancy',
    title: 'Открыта вакансия социального работника',
    title_highlighted: 'Открыта вакансия социального работника',
    description: 'SOS Детские деревни ищут опытного социального работника для работы с детьми.',
    description_highlighted: 'SOS Детские деревни ищут опытного социального работника для работы с детьми.',
    url: '/vacancies/1',
    created_at: '2024-01-10T00:00:00.000Z',
    relevance_score: 0.8
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type') || '';

    // Валидация параметров
    if (!query.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Query parameter is required'
      }, { status: 400 });
    }

    // Фильтрация данных
    let filteredResults = mockData.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesType = !type || item.type === type;
      
      return matchesQuery && matchesType;
    });

    // Сортировка по релевантности (простая реализация)
    filteredResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase());
      const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase());
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // Пагинация
    const total_results = filteredResults.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    const response: SearchResponse = {
      query,
      total_results,
      results: paginatedResults
    };

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    logger.error('Search API error', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, page = 1, limit = 12, type = '' } = body;

    // Валидация
    if (!query || !query.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Query is required'
      }, { status: 400 });
    }

    // Используем ту же логику поиска, что и в GET
    let filteredResults = mockData.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesType = !type || item.type === type;
      
      return matchesQuery && matchesType;
    });

    // Сортировка по релевантности
    filteredResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase());
      const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase());
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // Пагинация
    const total_results = filteredResults.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    const response: SearchResponse = {
      query,
      total_results,
      results: paginatedResults
    };

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    logger.error('Search API error', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
