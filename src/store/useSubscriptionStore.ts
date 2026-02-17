// shared/store/subscriptionStore.ts
import {create} from 'zustand'
import {$apiClient} from '@/shared/api/api_client'
import {ISubscription, ISubscriptionResponse} from '@/shared/types/subscription'
import axios from 'axios'
import Cookies from 'js-cookie'
import { logger } from '@/shared/lib/logger'

interface SubscriptionState {
    subscriptions: ISubscription[]
    loading: boolean
    error: string | null
    fetchSubscriptions: () => Promise<void>
    downloadReceipt: (uuid: string) => Promise<void>
    pauseSubscription: (uuid: string) => Promise<void>
    resumeSubscription: (uuid: string) => Promise<void>
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
    subscriptions: [],
    loading: false,
    error: null,

    fetchSubscriptions: async () => {
        set({loading: true, error: null})
        try {
            const res = await $apiClient.get<ISubscriptionResponse>('/donations/donations/my_donations/')
            if (res.success && res.data) {
                set({subscriptions: res.data.results, loading: false})
            } else {
                set({error: 'Не удалось загрузить подписки', loading: false})
            }
        } catch {
            set({error: 'Ошибка при загрузке данных', loading: false})
        }
    },
    downloadReceipt: async (uuid: string) => {
        try {
            const token = Cookies.get('token')
            const res = await axios.get(
                `https://api.sos-kyrgyzstan.org/api/v1/donations/donations/${uuid}/download_receipt/`,
                {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const blob = new Blob([res.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `receipt_${uuid}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (e) {
            logger.error('Ошибка при скачивании квитанции', e)
            alert('Не удалось скачать квитанцию')
        }
    },
    pauseSubscription: async (uuid) => {
        try {
            await $apiClient.post(`/donations/donations/${uuid}/pause_subscription/`, {})
            await get().fetchSubscriptions()
        } catch (err) {
            logger.error('Ошибка при приостановке подписки', err)
            alert('Не удалось приостановить подписку')
        }
    },

    resumeSubscription: async (uuid) => {
        try {
            await $apiClient.post(`/donations/donations/${uuid}/resume_subscription/`, {})
            await get().fetchSubscriptions()
        } catch (err) {
            logger.error('Ошибка при возобновлении подписки', err)
            alert('Не удалось возобновить подписку')
        }
    },
}))
