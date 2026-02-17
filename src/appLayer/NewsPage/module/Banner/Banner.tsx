import React from 'react'
import { useTranslations } from 'next-intl'
import s from './Banner.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import Donation from '@/shared/ui/Donation/Donation'

const Banner = () => {
  const t = useTranslations('newsPage.banner')
  
  return (
    <div className={s.banner}>
     <BannerPages url="/image/fond/fondMain.jpg">
        <div className={s.title}>
          <h1>{t('title')}</h1>
          <p className={s.description}>
          {t('description')}
           </p>
          <div className={s.donation}>
            <span className={s.bold}>{t('supportText')}</span>
            <Donation />
          </div>
        </div>
      </BannerPages>
    </div>
  )
}

export default Banner