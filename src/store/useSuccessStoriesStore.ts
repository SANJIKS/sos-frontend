import { create } from 'zustand'
import { $apiClient } from '@/shared/api/api_client'

export interface SuccessStoryItem {
    uuid: string
    title: string
    quote_text: string
    author_name: string
    author_position: string
    author_image: string | null
    is_featured: boolean
    order: number
}

export interface SuccessStoriesParams {
    locale?: string
    story_type?: string
    search?: string
}

interface SuccessStoriesStoreState {
    stories: SuccessStoryItem[] | null
    loading: boolean
    error: string | null
    fetchStories: (params?: SuccessStoriesParams) => Promise<void>
}

const useSuccessStoriesStore = create<SuccessStoriesStoreState>((set) => ({
    stories: null,
    loading: false,
    error: null,

    fetchStories: async (params?: SuccessStoriesParams) => {
        set({ loading: true, error: null })
        try {
            const searchParams = new URLSearchParams()
            if (params?.locale) searchParams.append('lang', params.locale)
            if (params?.story_type) searchParams.append('story_type', params.story_type)
            if (params?.search) searchParams.append('search', params.search)

            const url = `/success-stories/stories/?${searchParams.toString()}`
            const res = await $apiClient.get<SuccessStoryItem[]>(url)

            if (res.success && res.data) {
                set({ stories: res.data, loading: false })
            } else {
                set({ error: 'Ошибка при загрузке историй успеха', loading: false })
            }
        } catch (error) {
            set({ error: 'Ошибка при загрузке историй успеха', loading: false })
        }
    }
}))

export default useSuccessStoriesStore