import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import React from 'react'
import s from './FoundationHistoryPage.module.scss'
import {Montserrat} from 'next/font/google'
import { Introduction, Principles, Appearance, SuccessStory, Programs } from './module'
import { useTranslations } from 'next-intl'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '600', '500', '300', '200', '100', '900'],
})

const FoundationHistoryPage = () => {
  const t = useTranslations('foundationHistory')
  return (
    <div className={montserrat.className}>
      <BannerPages url='/image/foundation-history/FoundationHistoryPageBanner.png'>
        <div className={s.title}>
          <h1>{t('title')}</h1>
          <p>
            {t('subtitle.part1')} <br /> {t('subtitle.part2')}
          </p>
        </div>
      </BannerPages> 
      <div className={s.content}>
        <Introduction />
        <Principles />
        <Appearance />  
        <SuccessStory />
        <Programs />
      </div>
    </div>
  )
}

export default FoundationHistoryPage