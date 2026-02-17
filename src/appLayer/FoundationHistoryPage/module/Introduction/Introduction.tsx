import React from 'react'
import s from './Introduction.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
const Introduction = () => {
  const t = useTranslations('foundationHistory.introduction')
  return (
    <section className={s.introduction}>
        
      <div className={s.title}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <div className={s.card}>
        <div className={s.cardText}>
         <Image src='/icons/foundation-history/Introduction-card-iconst.svg' alt='card' width={56} height={41} blurDataURL='/icons/foundation-history/Introduction-card-iconst.svg' />
          <div>
            <h3>{t('card.title')}</h3>
            <span>{t('card.line1')}</span>
            <span>{t('card.line2')}</span>
          </div>
        </div>
        <div className={s.cardImage}>
          <Image src='/image/foundation-history/Introduction-card.png' alt='card' fill objectFit='cover' blurDataURL='/image/foundation-history/Introduction-card.png' />
        </div>

      </div>
    </section>
  )
}

export default Introduction 