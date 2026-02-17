import {create} from 'zustand'
import {IRequisite} from '@/shared/types/requisite'
import {$apiClient} from '@/shared/api/api_client'

interface IQrCode {
    id: number
    qr_code: string
}

interface RequisitesState {
    requisites: IRequisite[]
    qrCodes: IQrCode[]
    loading: boolean
    error: string | null
    fetchRequisites: (currency?: string) => Promise<void>
    fetchQrCodes: () => Promise<void>
}

export const useRequisitesStore = create<RequisitesState>((set) => ({
    requisites: [],
    qrCodes: [],
    loading: false,
    error: null,

    fetchRequisites: async (currency) => {
        set({loading: true, error: null})
        try {
            const query = currency ? `?currency=${currency}` : ''
            const res = await $apiClient.get<IRequisite[]>(`/banking-requisites/requisites/${query}`)
            if (res.success && res.data) {
                set({requisites: res.data, loading: false})
            } else {
                set({error: (res.error as string) || 'Ошибка загрузки', loading: false})
            }
        } catch {
            set({error: 'Ошибка загрузки', loading: false})
        }
    },

    fetchQrCodes: async () => {
        set({loading: true, error: null})
        try {
            const res = await $apiClient.get<IQrCode[]>('/qrcode/qrcode/')
            if (res.success && res.data) {
                set({qrCodes: res.data, loading: false})
            } else {
                set({error: (res.error as string) || 'Ошибка загрузки QR-кодов', loading: false})
            }
        } catch {
            set({error: 'Ошибка загрузки QR-кодов', loading: false})
        }
    }
}))
