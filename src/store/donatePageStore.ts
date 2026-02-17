import { create } from 'zustand'
import { $apiClient } from '@/shared/api/api_client'

// === Типы ===
export type SuccessStory = {
  id?: number
  title?: string
  description?: string
  image?: string | null
  is_active?: boolean
  order?: number
  quote_text?: string,
  author_image?: string | null
}

export type FAQ = {
  id: number
  question: string
  answer: string
  number_of_questions: number
}

export type Friend = {
  id: number
  name: string
  logo: string | null
  link: string | null
  is_active: boolean
  order: number
}

export interface ApiResponse<T> {
  data: T[]
  error: string | null
  success: boolean
}

// === Состояние стора ===
interface DonatePageState {
  data: {
    successStories: SuccessStory | null
    faq: FAQ | null
    friends: Friend | null
  }
  loading: boolean
  error: string | null

  fetchSuccessStories: (locale?: string) => Promise<void>
  fetchFAQ: (locale?: string) => Promise<void>
  fetchFriends: (locale?: string) => Promise<void>
}

// === Реализация Zustand стора ===
export const useDonatePageStore = create<DonatePageState>((set) => ({
  data: {
    successStories: null,
    faq: null,
    friends: null,
  },
  loading: false,
  error: null,

  // === Истории успеха ===
  fetchSuccessStories: async (locale = 'ru') => {
    set({ loading: true, error: null })
    try {
      const searchParams = new URLSearchParams({ lang: locale,story_type:"success" })
      const { data: response } = await $apiClient.get<SuccessStory>(
        `/success-stories/stories/?${searchParams.toString()}`
      )

      if (response) {
      set((state) => ({
        data: {
          ...state.data,
          successStories: response,
        },
      }))
      } else {
        set({ error: 'Ошибка при загрузке историй успеха' })
      }
    } catch {
      set({ error: 'Ошибка при загрузке историй успеха' })
    } finally {
      set({ loading: false })
    }
  },

  fetchFAQ: async (locale = 'ru') => {
    set({ loading: true, error: null })
    try {
      const searchParams = new URLSearchParams({ lang: locale })
      const { data: response } = await $apiClient.get<FAQ>(
        `/faq/?${searchParams.toString()}`
      )
      if (response) {
     
        set((state) => ({
          data: {
            ...state.data,
            faq: response,
          },
        }))
      } else {
        set({ error: 'Ошибка при загрузке FAQ' })
      }
    } catch {
      set({ error: 'Ошибка при загрузке FAQ' })
    } finally {
      set({ loading: false })
    }
  },

  fetchFriends: async (locale = 'ru') => {
    set({ loading: true, error: null })
    try {
      const searchParams = new URLSearchParams({ lang: locale })
      const { data: response } = await $apiClient.get<Friend>(
        `/success-stories/stories/?${searchParams.toString()}`
      )

      if (response) {
        set((state) => ({
          data: { ...state.data, friends: response },
        }))
      } else {
        set({ error:   'Ошибка при загрузке друзей SOS' })
      }
    } catch {
      set({ error: 'Ошибка при загрузке друзей SOS' })
    } finally {
      set({ loading: false })
    }
  },
}))
