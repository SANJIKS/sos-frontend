'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import s from './LogoSection.module.scss'
import OurFriendsFeedbackForm from '@/shared/ui/FeedbackForm/OurFriendsFeedbackForm'
import { useTranslations } from 'next-intl'

// ─── Данные логотипов ────────────────────────────────────────────────────────

const institutionalDonors = [
    { name: 'Донор 1',  file: '0.jpg' },
    { name: 'Донор 2',  file: '0.png' },
    { name: 'Донор 3',  file: '1.jpg' },
    { name: 'Донор 4',  file: '2.png' },
    { name: 'Донор 5',  file: '3.jpg' },
    { name: 'Донор 6',  file: '4.png' },
    { name: 'Донор 7',  file: '5.png' },
    { name: 'Донор 8',  file: '6.jpg' },
    { name: 'Донор 9',  file: '7.png' },
    { name: 'Донор 10', file: '8.png' },
    { name: 'Донор 11', file: '9.png' },
    { name: 'Донор 12', file: '10.jpg' },
    { name: 'Донор 13', file: '11.jpg' },
]

const governmentBodies = [
    { name: 'Гос. орган 1', file: '0.png' },
    { name: 'Гос. орган 2', file: '1.jpg' },
]

const others = [
    { name: 'Другой партнёр 1', file: '0.png' },
]

// ─── Сетка логотипов ─────────────────────────────────────────────────────────

const LogoGrid = ({
    items,
    basePath,
}: {
    items: { name: string; file: string }[]
    basePath: string
}) => (
    <div className={s.logoGrid}>
        {items.map((item, i) => (
            <div key={i} className={s.logoCard}>
                <Image
                    src={`${basePath}${item.file}`}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain', padding: '16px' }}
                />
            </div>
        ))}
    </div>
)

// ─── Основной компонент ──────────────────────────────────────────────────────

const LogoSection = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const t = useTranslations('logoSection')

    return (
        <section className={s.section}>

            {/* Институциональные доноры */}
            <div className={s.category}>
                <h2 className={s.categoryTitle}>{t('institutionalDonors')}</h2>
                <LogoGrid items={institutionalDonors} basePath="/image/partner/ins/" />
            </div>

            {/* Государственные органы */}
            <div className={s.category}>
                <h2 className={s.categoryTitle}>{t('governmentBodies')}</h2>
                <LogoGrid items={governmentBodies} basePath="/image/partner/gos/" />
            </div>

            {/* Другие */}
            <div className={s.category}>
                <h2 className={s.categoryTitle}>{t('others')}</h2>
                <LogoGrid items={others} basePath="/image/partner/others/" />
            </div>

            {/* CTA */}
            <div className={s.cta}>
                <h3 className={s.ctaTitle}>{t('ctaTitle')}</h3>
                <button className={s.ctaBtn} onClick={() => setModalOpen(true)}>
                    <span>🤚</span>
                    {t('ctaBtn')}
                </button>
            </div>

            {/* Модалка с реальной формой */}
            {modalOpen && (
                <div className={s.overlay} onClick={() => setModalOpen(false)}>
                    <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={s.closeBtn} onClick={() => setModalOpen(false)}>×</button>
                        <div className={s.modalHeader}>
                            <h2 className={s.modalTitle}>{t('modalTitle')}</h2>
                            <p className={s.modalSub}>{t('modalSub')}</p>
                        </div>
                        <OurFriendsFeedbackForm
                            title={t('modalTitle')}
                            description=""
                            translationKey="contacts.feedbackForm"
                            recipientEmail="info@soskyrgyzstan.kg"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

export default LogoSection