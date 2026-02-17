import React from 'react'
import s from './Programs.module.scss'
import { useTranslations } from 'next-intl'
import { ProgramsCards } from './Cards/Cards'
const Programs = () => {
    const t = useTranslations('foundationHistory.programs')
 
  return (
    <section className={s.programs}>
        <div className={s.text}>
            <h3>{t('title')}</h3>
            <p>{t('description')}</p>
        </div>
     <ProgramsCards />
    </section>
  )
}

export default Programs