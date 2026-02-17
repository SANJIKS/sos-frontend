import React from 'react'
import s  from './SuccessStory.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
const SuccessStory = () => {
    const t = useTranslations('foundationHistory.success')
    const list = [
        {
            title: t('list.0'),
        },
        {
            title: t('list.1'),
        },
        {
            title: t('list.2'),
        },
    ]
  return (
    <section className={s.successStory}>
       <h3 className={s.title}>{t('title')}</h3>
       <div className={s.card}>
        <h3>{t('workYears')}</h3>
        <ul>
            {list.map((item, index) => (
                <li key={index}>
                    <span>
                        <Image src={`/icons/foundation-history/Success-story-item-${index}.svg`} alt='item' fill objectFit='cover' blurDataURL={`/icons/foundation-history/SuccessStory-item-${index + 1}.svg`} />
                    </span>
                    <p>{item.title}</p>
                </li>
            ))}
        </ul>

       </div>
       <div className={s.description}>
        <div className={s.descriptionText}>
            <div>
                <Image
                 src={'/icons/foundation-history/Success-story-vector.svg'}
                 alt='item' 
                 width={64}
                 height={47}
                 blurDataURL={'/icons/foundation-history/SuccessStory-vector.svg'}
                 />
            </div>
            <span>
            <h3>{t('quote.title')}</h3>
            <p>{t('quote.caption')}</p>
            </span>
        </div>
        <div className={s.descriptionImage}>
            
        </div>

       </div>
    </section>
  )
}

export default SuccessStory