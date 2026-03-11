'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import s from './CorporateDonorsGrid.module.scss'
import { useLocale } from 'next-intl'
import OurFriendsFeedbackForm from '@/shared/ui/FeedbackForm/OurFriendsFeedbackForm'

const titles: Record<string, string> = {
    ru: 'Корпоративные доноры',
    ky: 'Корпоративдик донорлор',
    en: 'Corporate Donors',
}

const ctaLabels: Record<string, string> = {
    ru: 'Стать корпоративным донором',
    ky: 'Корпоративдик донор болуу',
    en: 'Become a Corporate Donor',
}

const ctaTitles: Record<string, string> = {
    ru: 'Хотите внести свой вклад?',
    ky: 'Салым кошкуңуз келеби?',
    en: 'Want to make a contribution?',
}

// Картинки в порядке нумерации файлов 0..28
const logos = [
    '0.png','1.png','2.jpg','3.jpg','4.png','5.jpg','6.png','7.jpg',
    '8.jpg','9.png','10.png','11.png','12.jpg','13.png','14.jpg','15.png',
    '16.png','17.png','18.png','19.jpg','20.jpg','21.jpg','22.png','23.png',
    '24.png','25.jpg','26.png','27.jpg','28.png',
]

const CorporateDonorsGrid = () => {
    const locale = useLocale()
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>{titles[locale] ?? titles['ru']}</h2>

            <div className={s.grid}>
                {logos.map((file, i) => (
                    <div key={i} className={s.card}>
                        <Image
                            src={`/image/partner/corporatelogos/${file}`}
                            alt={`Донор ${i + 1}`}
                            fill
                            style={{ objectFit: 'contain', padding: '12px' }}
                        />
                    </div>
                ))}
            </div>

            <div className={s.cta}>
                <p className={s.ctaTitle}>{ctaTitles[locale] ?? ctaTitles['ru']}</p>
                <button className={s.ctaBtn} onClick={() => setModalOpen(true)}>
                    <img src="/icons/partners/corporates/hand.png" alt="" className={s.btnIcon} />
                    {ctaLabels[locale] ?? ctaLabels['ru']}
                </button>
            </div>

            {modalOpen && (
                <div className={s.overlay} onClick={() => setModalOpen(false)}>
                    <div className={s.modal} onClick={e => e.stopPropagation()}>
                        <button className={s.closeBtn} onClick={() => setModalOpen(false)}>×</button>
                        <OurFriendsFeedbackForm
                            title={ctaLabels[locale] ?? ctaLabels['ru']}
                            description=""
                            translationKey="contacts.feedbackForm"
                            recipientEmail="Cholpon.Akhunova@soskyrgyzstan.kg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CorporateDonorsGrid