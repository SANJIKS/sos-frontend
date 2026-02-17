import React from 'react'
import s  from './Principles.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Principles = () => {
  const t = useTranslations('foundationHistory.principles')
  const principlesList = [
    {
        title: t('items.0.title'),
        description: t('items.0.description'),
    },
    {
        title: t('items.1.title'),
        description: t('items.1.description'),
    },
    {
        title: t('items.2.title'),
        description: t('items.2.description'),
    },
    {
        title: t('items.3.title'),
        description: t('items.3.description'),
    },
    
  ]
  return (
    <section className={s.principles}>
     <h3>{t('title')}</h3>
      <div className={s.principlesList}>
        {principlesList.map((item, index) => (
            <div className={s.principlesItem} key={index}>
                    <div className={s.principlesItemImage}>
                    <Image src={`/icons/foundation-history/Principles-item-${index}.svg`} alt='principles' fill objectFit='cover' blurDataURL={`/icons/foundation-history/Principles-item-${index + 1}.svg`} />
                </div>
                <div className={s.principlesItemText}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                </div>
            </div>
        ))}
      </div>
      <h3>{t('footer')}</h3>
    </section>
  )
}

export default Principles