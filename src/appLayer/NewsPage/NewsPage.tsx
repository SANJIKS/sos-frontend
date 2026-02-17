import React from 'react'
import s from './NewsPage.module.scss'
import { Banner, NewsList } from './module'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
const NewsPage = () => {
  return (
    <div className={s.news}>
      <Banner />
      <div className={s.container}>
        <NewsList/>
        <DonationForm/>
      </div>
    </div>
  )
}

export default NewsPage