'use client'

import React, {useEffect} from 'react'
import {useLocale, useTranslations} from 'next-intl'
import s from './DonatePage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import {DonationImpact, Form, SocialMedia, SOSFriends} from './module'
import PaymentStub from './module/Payment/PaymentStub'
import SuccessStories from '@/shared/ui/SuccessStories/SuccessStories'
import FAQ from '@/shared/ui/FAQ/FAQ'
import {Friend, SuccessStory, useDonatePageStore} from '@/store/donatePageStore'

const DonatePage = () => {
  const t = useTranslations('donatePage')
  const locale = useLocale()
  const { data, error, fetchSuccessStories, fetchFAQ, fetchFriends } =
    useDonatePageStore()
  useEffect(() => {
    fetchSuccessStories(locale)
    fetchFAQ(locale)
    fetchFriends(locale)
  }, [locale])

  return (
    <section>
      <BannerPages url="/image/donate/banner.jpg">
        <div className={s.title}>
          <h1>{t('banner.title')}</h1>
          <p>{t('banner.subtitle')}</p>
        </div>
      </BannerPages>

      <div className={s.content}>
        <PaymentStub />
        <DonationImpact />

        {/*{loading && <p>Загрузка данных...</p>}*/}
        {error && <p className={s.error}>{error}</p>}

        {data.successStories && Array.isArray(data.successStories) && (<SuccessStories stories={data.successStories as SuccessStory[]} />)}
        {Array.isArray(data.faq) && data.faq.length > 0 && <FAQ faq={data.faq} />}
        {Array.isArray(data.friends) && data.friends.length > 0 && <SOSFriends friends={data.friends as Friend[]} />}
        <SocialMedia />

        <Form />
      </div>
    </section>
  )
}

export default DonatePage
