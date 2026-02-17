import {create} from 'zustand'
import {$apiClient} from '@/shared/api/api_client'
import { logger } from '@/shared/lib/logger'

export interface IImpactResult {
    id: number
    title: string
    percentage_value: number
    description: string
    result_type: string
    result_type_display: string
    image: string
    is_featured: boolean
    order: number
}

interface ImpactResultsState {
    results: IImpactResult[]
    loading: boolean
    fetchResults: () => Promise<void>
}

export const useImpactResultsStore = create<ImpactResultsState>((set) => ({
    results: [],
    loading: false,

    fetchResults: async () => {
        try {
            set({loading: true})
            const res = await $apiClient.get<IImpactResult[]>('/impact-results/')
            if (res.success && res.data) {
                set({results: res.data})
            }
        } catch (error) {
            logger.error('Error fetching impact results', error)
        } finally {
            set({loading: false})
        }
    }
}))
