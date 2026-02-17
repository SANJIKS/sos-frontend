// app/donation-options/[id]/page.tsx
import { notFound } from 'next/navigation'
import { $apiClient } from '@/shared/api/api_client'
import { IDonationOption } from '@/shared/types/donation'
import DetailedDonationPage from '@/appLayer/DetailedDonationPage/DetailedDonationPage'

// interface DonationPageProps {
//     params: { id: string }
// }

// const DonationPage = async ({ params }: DonationPageProps) => {
//     const { id } = params
const DonationPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const res = await $apiClient.get<IDonationOption>(`/donation-options/${id}/`)
    if (!res.success || !res.data) {
        notFound()
    }

    return <DetailedDonationPage option={res.data} />
}

export default DonationPage
