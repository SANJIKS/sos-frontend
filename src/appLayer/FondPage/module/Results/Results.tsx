'use client'

import React, {useEffect} from 'react'
import { useTranslations } from 'next-intl'
import s from './Results.module.scss'
import Image from 'next/image'
import {useImpactResultsStore} from '@/store/useImpactResultsStore'

const Results = () => {
    const t = useTranslations('fondPage.results')
    const {results, fetchResults} = useImpactResultsStore()

    useEffect(() => {
        fetchResults()
    }, [fetchResults])

    return (
        <section className={s.results}>
            <div className={s.title}>
                <h2>{t('title')}</h2>
                <p>{t('description')}</p>
            </div>
            <p className={s.resultsTitle}>{t('resultsLabel')}</p>
            <ul>
                {results.map((item, index) => (
                    <li key={index}>
            <span>
              <Image
                  src={item.image || `/image/fond/background-1.jpg`}
                  alt="item"
                  fill
                  objectFit="cover"
                  blurDataURL={`/image/fond/background-1.jpg`}
              />
            </span>
                        <p className={s.percent}>{item.percentage_value} %</p>
                        <p className={s.text}>{item.title}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Results
