import {$apiClient} from '@/shared/api/api_client'
import {IProgram} from '@/shared/types/program'
import {notFound} from 'next/navigation'
import DetailedProgamPage from '@/appLayer/DetailedProgramPage/DetailedProgamPage'

const ProgramPage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
    const { uuid } = await params

    const res = await $apiClient.get<IProgram>(`/programs/${uuid}/`)
    if (!res.success || !res.data) {
        notFound()
    }

    return <DetailedProgamPage program={res.data} />
}

export default ProgramPage
