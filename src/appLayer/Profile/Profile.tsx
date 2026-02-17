'use client'

import React from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import s from './Profile.module.scss'
import PersonalData from '@/appLayer/Profile/module/PersonalData/PersonalData'
import Subscription from '@/appLayer/Profile/module/Subscription/Subscription'
import {useTranslations} from 'next-intl'

const Profile = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const t = useTranslations('auth.profile')

    const tab = searchParams.get('tab') || 'personal'

    const handleTabChange = (newTab: string) => {
        router.push(`?tab=${newTab}`, { scroll: false })
    }

    return (
        <section className={s.container}>
            <div className={s.profile}>
                <h1
                    onClick={() => handleTabChange('personal')}
                    className={tab === 'personal' ? s.active : s.title}
                >
                    {t('personalData')}
                </h1>
                <h2
                    onClick={() => handleTabChange('subscription')}
                    className={tab === 'subscription' ? s.active : s.title}
                >
                    {t('subscription')}
                </h2>
            </div>

            {tab === 'personal' ? <PersonalData /> : <Subscription />}
        </section>
    )
}

export default Profile
