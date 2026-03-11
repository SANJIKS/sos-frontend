import { create } from 'zustand'
import { $apiClient } from '@/shared/api/api_client'

export interface ISOSFriend {
    id: number
    name: string
    location: string
    photo: string | null
    photo_url: string | null
    message: string
    created_at: string
}

interface FriendsState {
    friends: ISOSFriend[]
    totalPages: number
    currentPage: number
    count: number
    loading: boolean
    error: string | null
    fetchFriends: (page?: number) => Promise<void>
}

export const useSOSFriendsStore = create<FriendsState>((set) => ({
    friends: [],
    totalPages: 1,
    currentPage: 1,
    count: 0,
    loading: false,
    error: null,

    fetchFriends: async (page = 1) => {
        set({ loading: true, error: null })
        try {
            const res = await $apiClient.get<{
                count: number
                total_pages: number
                current_page: number
                results: ISOSFriend[]
            }>(`/sos-friends/friends/friends/?page=${page}&page_size=5`)

            if (res.success && res.data) {
                set({
                    friends: res.data.results,
                    totalPages: res.data.total_pages,
                    currentPage: res.data.current_page,
                    count: res.data.count,
                    loading: false,
                })
            } else {
                set({ error: 'Ошибка загрузки', loading: false })
            }
        } catch {
            set({ error: 'Ошибка загрузки', loading: false })
        }
    },
}))