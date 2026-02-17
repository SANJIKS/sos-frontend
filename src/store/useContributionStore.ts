import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {$apiClient} from '@/shared/api/api_client'

export interface Contribution {
    id: number
    title: string
    description: string
    option_type: string
    option_type_display: string
    status: string
    status_display: string
    image: string
    button_text: string
    button_url: string
    is_button_enabled: boolean
    is_featured: boolean
    order: number
}

interface ContributionState {
    contributions: Contribution[]
    loading: boolean
    error: string | null
    fetchContributions: () => Promise<void>
}

export const useContributionStore = create<ContributionState>()(
    devtools((set) => ({
        contributions: [],
        loading: false,
        error: null,

        fetchContributions: async () => {
            try {
                set({loading: true, error: null})

                const res = await $apiClient.get<Contribution[]>('/donation-options/')

                if (res.success && res.data) {
                    set({contributions: res.data, loading: false})
                } else {
                    set({error: 'Ошибка при загрузке данных', loading: false})
                }
            } catch (error: unknown) {
                const errorMsg = error instanceof Error ? error.message : 'Ошибка при загрузке';
                set({error: errorMsg, loading: false})
            }
        }
    }))
)
