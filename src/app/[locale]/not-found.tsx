"use client"
import ErrorPage from '@/appLayer/ErrorPage/ErrorPage'
import { useTranslations } from 'next-intl'

export default function NotFound() {
    const t = useTranslations('notFound')
    
    return (
        <ErrorPage
            handel={() => window.location.href = '/'}
            title={t('title')}
            message={t('message')}
            buttonName={t('buttonText')}
        />
    )
}
