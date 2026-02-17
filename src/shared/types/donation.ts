export interface IDonationOption {
    id: number
    title: string
    description: string
    option_type: string
    option_type_display: string
    status: string
    status_display: string
    image: string | null
    button_text: string
    button_url: string
    is_button_enabled: boolean
    is_active: boolean
    is_featured: boolean
    order: number
    detailed_description: string
    requirements: string
    benefits: string
    min_amount: string
    created_at: string
    updated_at: string
}
