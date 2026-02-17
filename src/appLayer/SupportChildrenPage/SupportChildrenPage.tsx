import React from 'react'
import {useTranslations} from 'next-intl'
import s from './SupportChildrenPage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import Donation from '@/shared/ui/Donation/Donation'
import Options from './module/Options/Options'
import Contribution from '@/appLayer/SupportChildrenPage/module/Contribution/Contribution'
import Requisite from '@/appLayer/SupportChildrenPage/module/Requisite/Requisite'
import {Form} from '@/appLayer/DonatePage/module'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'

const SupportChildrenPage = () => {
    const t = useTranslations('supportChildrenPage')
    
    return (
        <div className={s.supportChildrenPage}>
            <BannerPages url="/image/fond/fondMain.jpg">
                <div className={s.title}>
                    <h1>{t('banner.title')}</h1>
                    <p className={s.description}>
                        {t('banner.description')}
                    </p>
                    <div className={s.donation}>
                        <span className={s.bold}>{t('banner.supportText')}</span>
                        <Donation/>
                    </div>
                </div>
            </BannerPages>
            <div className={s.content}>
                <DonationForm/>
                <Options/>
                <Contribution/>
                <Requisite/>
                <Form/>
            </div>
        </div>
    )
}

export default SupportChildrenPage
