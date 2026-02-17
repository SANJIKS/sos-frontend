import React from 'react'
import s from './OurFriendsForm.module.scss'
import { useTranslations } from 'next-intl'

import FeedbackForm from "@/shared/ui/FeedbackForm/FeedbackForm";
const OurFriendsForm = () => {
  const t = useTranslations('ourFriendsForm')
  return (
    <div className={s.ourFriendsForm}>
      <FeedbackForm  title={t('title')} description={t('description')}/>
    </div>
  )
}

export default OurFriendsForm