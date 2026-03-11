export interface IRequisite {
    id: number
    title: string
    organization_type: 'main_foundation' | 'children_village' | 'educational_center' | 'other'
    organization_type_display: string
    currency: 'KGS' | 'USD' | 'EUR' | 'RUB'
    currency_display: string
    bank_name: string
    account_number: string
    bik?: string
    swift?: string
    inn?: string
    okpo?: string
    tax_office?: string
    correspondent_bank?: string
    correspondent_swift?: string
    correspondent_address?: string
    correspondent_account?: string
    description?: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}