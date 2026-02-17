import {create} from 'zustand'
import {$apiClient} from '@/shared/api/api_client'
import { cache, createCacheKey } from '@/shared/lib/cache'
import { logger } from '@/shared/lib/logger'

interface IProgram {
    id: number
    title: string
    description: string
    short_description: string
    image: string
    icon: string
    program_type: string
    is_featured: boolean
    is_main_program: boolean
    order: number
    program_type_display: string
    uuid: string
}

interface ProgramsState {
    programs: IProgram[]
    loading: boolean
    error: string | null
    fetchPrograms: () => Promise<void>
}

export const useProgramsStore = create<ProgramsState>((set) => ({
    programs: [],
    loading: false,
    error: null,

    fetchPrograms: async () => {
        set({ loading: true, error: null })
        
        // Проверяем кэш
        const cacheKey = createCacheKey('programs');
        const cachedData = cache.get<IProgram[]>(cacheKey);
        if (cachedData) {
            set({ programs: cachedData, loading: false });
            return;
        }
        
        try {
            const res = await $apiClient.get<IProgram[]>('/programs/')
            if (res.success && res.data) {
                // Кэшируем на 10 минут (программы редко меняются)
                cache.set(cacheKey, res.data, 10 * 60 * 1000);
                set({ programs: res.data, loading: false })
            } else {
                set({ error: typeof res.error === 'string' ? res.error : 'Ошибка при загрузке программ', loading: false })
            }
        } catch (error) {
            logger.error('Error fetching programs', error);
            set({ error: 'Ошибка при загрузке программ', loading: false })
        }
    },
}))
