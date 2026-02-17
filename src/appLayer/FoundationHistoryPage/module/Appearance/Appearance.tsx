import React from 'react'
import s from './Appearance.module.scss'
import { useTranslations } from 'next-intl'
import { Cards } from './Cards/Cards'
const Appearance =  () => {
   
     const t = useTranslations('foundationHistory.appearance')
    return (
        <section className={s.appearance}>
            <div className={s.title}>
                <h3>{t('title')}</h3>
                <p>{t('description')}</p>
            </div>
            <h3 className={s.subtitle}>{t('subtitle')}</h3>
           <Cards/>
        </section>
    )
}

export default Appearance