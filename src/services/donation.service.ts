import {CONTENT_TYPE} from '@/shared/types/api_types'
import {$apiClient} from '@/shared/api/api_client'

export interface CreatePaymentParams {
    amount: number | null
    currency: "KGS" | "USD" | "EUR" | "RUB"
    type: "one_time" | "monthly" | "yearly" | null
    user_info?: {
        name: string
        email: string
        phone: string
    }
    recaptcha_token: string | null
    user_id?: number
    campaign_id?: number
    comment?: string
}

export interface CreatePaymentResponse {
    success: boolean
    payment_url?: string
    order_id?: string
    donation_uuid?: string
}

/**
 * Создание платежа через FreedomPay (единый эндпоинт)
 */
export async function createPaymentUnified(params: CreatePaymentParams) {
    return await $apiClient.post<CreatePaymentParams, CreatePaymentResponse>(
        "/donations/freedompay/create-payment-unified/",
        params,
        CONTENT_TYPE.JSON
    )
}
