export interface ISubscription {
    uuid: string
    donation_code: string
    campaign: string | null
    donor_full_name: string
    amount: string
    currency: string
    donation_type: 'one_time' | 'monthly' | 'yearly'
    payment_method: string
    status: string
    is_recurring: boolean
    next_payment_date: string | null
    recurring_active: boolean
    subscription_status: string | null
    subscription_status_display: string | null
    is_subscription_active: boolean,
    can_cancel_subscription: boolean,
    can_resume_subscription: boolean,
    can_pause_subscription: boolean,
    created_at: string
    updated_at: string
    payment_completed_at: string | null
}

export interface ISubscriptionResponse {
    count: number
    results: ISubscription[]
}
