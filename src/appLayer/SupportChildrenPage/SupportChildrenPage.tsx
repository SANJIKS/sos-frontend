'use client'
import React, {useEffect} from 'react'
import {useTranslations, useLocale} from 'next-intl'
import s from './SupportChildrenPage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import Donation from '@/shared/ui/Donation/Donation'
import Options from './module/Options/Options'
import Contribution from '@/appLayer/SupportChildrenPage/module/Contribution/Contribution'
import Requisite from '@/appLayer/SupportChildrenPage/module/Requisite/Requisite'
import {Form} from '@/appLayer/DonatePage/module'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import DonationImpact from '@/appLayer/DonatePage/module/DonationImpact/DonationImpact'
import SuccessStories from '@/shared/ui/SuccessStories/SuccessStories'
import SocialMedia from '@/appLayer/DonatePage/module/SocialMedia/SocialMedia'
import {SuccessStory, useDonatePageStore} from '@/store/donatePageStore'

const SupportChildrenPage = () => {
    const t = useTranslations('supportChildrenPage')
    const locale = useLocale()
    const {data, fetchSuccessStories} = useDonatePageStore()

    useEffect(() => {
        fetchSuccessStories(locale)
    }, [locale, fetchSuccessStories])

    return (
        <div className={s.supportChildrenPage}>
            <BannerPages url="/image/fond/fondMain.jpg">
                <div className={s.title}>
                    <h1>{t('banner.title')}</h1>
                    <p className={s.description}>{t('banner.description')}</p>
                    <div className={s.donation}>
                        <span className={s.bold}>{t('banner.supportText')}</span>
                        <Donation/>
                    </div>
                </div>
            </BannerPages>
            <div className={s.content}>
                <DonationForm/>
                <DonationImpact/>
                {data.successStories && Array.isArray(data.successStories) && (
                    <SuccessStories stories={data.successStories as SuccessStory[]}/>
                )}
                <Options/>
                <Contribution/>
                <Requisite/>
                <div className={s.socialMediaSmall}>
                    <SocialMedia/>
                </div>
                <Form/>
            </div>
        </div>
    )
}

export default SupportChildrenPage