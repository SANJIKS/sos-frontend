'use client'

import React, {useEffect, useState} from 'react'
import {useTranslations} from 'next-intl'
import s from './Main.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import Button from '@/shared/ui/Button/Button'
import Donation from '@/shared/ui/Donation/Donation'
import {Link} from '@/i18n/navigation'
import OurProgram from '@/sections/Main/modules/OurProgram/OurProgram'
import Achievemeants from '@/appLayer/Achievemeants/Achievemeants'
import Partners from '@/appLayer/Partners/Partners'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import {SuccessStories} from '@/appLayer/DonatePage/module'
import KyrgyzstanMap from '@/shared/ui/KyrgyzstanMap'
import FAQ from '@/shared/ui/FAQ/FAQ'
import {useMainPageStore} from '@/store/mainPageStore'

import {useParams} from 'next/navigation'
import FirstModal from '@/shared/ui/FirstModal/FirstModal'

const Main = () => {
    const t = useTranslations('mainPage')
    const {data, fetchSuccessStories, fetchFAQ} = useMainPageStore()
    const {locale}: { locale: string } = useParams()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        // Показывать модалку только один раз за сессию
        const hasSeen = sessionStorage.getItem('hasSeenModal')
        if (!hasSeen) {
            setShowModal(true)
            sessionStorage.setItem('hasSeenModal', 'true')
        }
    }, [])

    useEffect(() => {
        fetchSuccessStories(locale)
        fetchFAQ(locale)
    }, [locale, fetchSuccessStories, fetchFAQ])

    return (
        <div className={s.main}>
            {showModal && <FirstModal onClose={() => setShowModal(false)}/>}
            <BannerPages url="/image/main/mainPhoto.jpg">
                <div className={s.title}>
                    <h1>{t('banner.title')}</h1>
                    <p className={s.description}>
                        {t('banner.subtitle')}
                    </p>
                    <Link href="/donate"><Button theme="red"
                                                 className={s.btn}>{t('banner.donateButton')}</Button></Link>
                    <Link href="/support-children" className={s.more}>{t('banner.learnMore')}</Link>
                    <div className={s.donation}>
                        <span className={s.bold}>{t('banner.supportText')}</span>
                        <Donation/>
                    </div>
                </div>
            </BannerPages>

            <div className={s.content}>
                <OurProgram/>
                <KyrgyzstanMap/>
                <Achievemeants/>
                <DonationForm/>
                {Array.isArray(data?.faq) && data.faq.length > 0 && <FAQ faq={data.faq}/>}
                {Array.isArray(data?.successStories) && data.successStories.length > 0 &&
                    <SuccessStories stories={data.successStories}/>}
                <Partners/>
            </div>
        </div>
    )
}

export default Main
