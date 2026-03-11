'use client'
import React, { useState, useEffect } from 'react'
import s from './OurFriendsFriendsPage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import OurFriendsFeedbackForm from '@/shared/ui/FeedbackForm/OurFriendsFeedbackForm'
import ReviewModal from '@/shared/ui/ReviewModal/ReviewModal'
import { useReviewStore } from '@/store/useReviewStore'
import { useSOSFriendsStore, ISOSFriend } from '@/store/useSOSFriendsStore'
import CorporateDonorsSlider from '@/appLayer/OurFriendsFriendsPage/CorporateDonorsSlider'
import Image from 'next/image'

// ─── Карточка друга ──────────────────────────────────────────────────────────
const FriendCard = ({ friend }: { friend: ISOSFriend }) => (
    <div className={s.friendCard}>
        <div className={s.friendCardTop}>
            <div className={s.friendAvatar}>
                {friend.photo_url
                    ? <Image src={friend.photo_url} alt={friend.name} fill style={{ objectFit: 'cover' }} />
                    : <div className={s.friendAvatarPlaceholder}>{friend.name[0]}</div>
                }
            </div>
            <span className={s.quoteIcon}>
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                    <text x="0" y="28" fontSize="36" fill="#00AEEF" fontFamily="Georgia, serif">❝❝</text>
                </svg>
            </span>
        </div>
        <p className={s.friendName}>
            {friend.name}{friend.location ? `, ${friend.location}` : ''}
        </p>
        <div className={s.friendMessage}>
            <p>{friend.message}</p>
        </div>
    </div>
)

// ─── Пагинация ────────────────────────────────────────────────────────────────
const Pagination = ({
    current,
    total,
    onChange,
}: {
    current: number
    total: number
    onChange: (page: number) => void
}) => {
    const pages: (number | '...')[] = []

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
            pages.push(i)
        }
        if (current < total - 2) pages.push('...')
        pages.push(total)
    }

    return (
        <div className={s.pagination}>
            <button
                className={s.paginationArrow}
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
            >‹</button>

            {pages.map((p, i) =>
                p === '...'
                    ? <span key={`dots-${i}`} className={s.paginationDots}>…</span>
                    : <button
                        key={p}
                        className={`${s.paginationBtn} ${p === current ? s.paginationActive : ''}`}
                        onClick={() => onChange(p as number)}
                    >{p}</button>
            )}

            <button
                className={s.paginationArrow}
                onClick={() => onChange(current + 1)}
                disabled={current === total}
            >›</button>
        </div>
    )
}

// ─── Основная страница ────────────────────────────────────────────────────────
const OurFriendsFriendsPage = () => {
    const t = useTranslations('ourFriendsFriendsPage')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { reset } = useReviewStore()
    const { friends = [], totalPages, currentPage, loading, fetchFriends } = useSOSFriendsStore()

    useEffect(() => {
        fetchFriends(1)
    }, [])

    const handleOpenModal = () => {
        reset()
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handlePageChange = (page: number) => {
        fetchFriends(page)
        document.getElementById('friends-section')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={s.ourFriendsFriendsPage}>
            <BannerPages url='/image/friends/banner.png'>
                <div className={s.title}>
                    <h1>{t('banner.title')}</h1>
                    <h2>{t('banner.subtitle')}</h2>
                    <Link href='/donate'>{t('banner.donateButton')}</Link>
                </div>
            </BannerPages>

            <div className={s.content}>

                {/* 1. Корпоративные доноры */}
                <CorporateDonorsSlider />

                {/* 2. Истории друзей */}
                <div className={s.friends} id="friends-section">
                    <h3>{t('content.friendsTitle')}</h3>

                    {loading ? (
                        <div className={s.loadingText}>Загрузка...</div>
                    ) : (
                        <>
                            <div className={s.friendsList}>
                                {/* Карточка "Присоединиться" */}
                                <div className={s.joinCard} onClick={handleOpenModal}>
                                    <p>{t('content.joinUsText')}</p>
                                    <svg width="71" height="70" viewBox="0 0 71 70" fill="none">
                                        <circle cx="35.5" cy="35" r="34" stroke="#00AEEF" strokeWidth="2"/>
                                        <path d="M35.5 20V50M20.5 35H50.5" stroke="#00AEEF" strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </div>

                                {friends.map((friend) => (
                                    <FriendCard key={friend.id} friend={friend} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    current={currentPage}
                                    total={totalPages}
                                    onChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>

                {/* 3. Форма обратной связи */}
                <div className={s.feedbackForm}>
                    <OurFriendsFeedbackForm
                        title={t('form.title')}
                        description={t('form.description')}
                        translationKey="contacts.feedbackForm"
                        recipientEmail="info@soskyrgyzstan.kg"
                    />
                </div>

                {/* 4. Форма пожертвования — последней */}
                <div className={s.donationForm}>
                    <DonationForm />
                </div>
            </div>

            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}

export default OurFriendsFriendsPage