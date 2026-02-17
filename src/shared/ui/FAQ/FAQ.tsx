'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import s from './FAQ.module.scss'
interface  type {
    faq: {
        id: number,
        question: string,
        answer: string,
        number_of_questions: number,
    }[]
}
const FAQ = ({
                 faq,
             }:type ) => {
    const t = useTranslations('faq')
    const [active, setActive] = useState(0)


    return (
        <div className={s.fAQ}>
            <div className={s.title}>
                <h3>{t('title')}</h3>
                <p>{t('subtitle')}</p>
            </div>
            <div className={s.faq}>

                {faq.length > 0 &&
                    faq.map((item, index) => (
                            <div onClick={() => setActive(index)} className={`${s.item} ${active == index ? s.active : ''}`} key={index}>
                                    <p className={s.index}>{item.id}</p>
                                <div className={s.content}>
                                    <h4>{item.question}   </h4>
                                    {active === index && <p>{item.answer}</p>}
                                </div>
                                <button className={active === index ? s.activeButton : ''}>
                                    {active === index ? "+" : "+"}
                                </button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default FAQ