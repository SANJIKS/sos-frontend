'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import s from './Introduction.module.scss'
import MainIco from '@/assets/icons/history.svg'

const Introduction = () => {
    const t = useTranslations('fondPage.introduction')
    
    return (
        <section className={s.introduction}>
            <div className={s.title}>
                <h2>{t('title')}</h2>
                <p>{t('description')}</p>
            </div>
            <div className={s.contentFond}>
                <div className={s.title}>
                    <h2>{t('ourMission.title')}</h2>
                    <p>{t('ourMission.description')}</p>
                </div>
                <div className={s.missionFond}>
                    <h3>{t('mission.title')}</h3>
                    <p>{t('mission.text')}</p>
                    <MainIco/>
                </div>
            </div>
        </section>
    )
}

export default Introduction
