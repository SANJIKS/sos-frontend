'use client'

import React, { useState } from 'react'
import s from './OurFriendsFriendsPage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import { Link } from '@/i18n/navigation'
import { PartnersCarousel } from '../OurFriends/module'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useDonatePageStore } from '@/store/donatePageStore'
import { FriendsCard } from '@/shared/ui/Cards'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import OurFriendsFeedbackForm from "@/shared/ui/FeedbackForm/OurFriendsFeedbackForm";
import ReviewModal from '@/shared/ui/ReviewModal/ReviewModal'
import { useReviewStore } from '@/store/useReviewStore'

const OurFriendsFriendsPage = () => {
    const t = useTranslations('ourFriendsFriendsPage')
    const locale = useLocale()
    const { data, fetchSuccessStories, fetchFAQ, fetchFriends } =
        useDonatePageStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { reset } = useReviewStore()

    useEffect(() => {
        fetchSuccessStories(locale)
        fetchFAQ(locale)
        fetchFriends(locale)
    }, [locale, fetchSuccessStories, fetchFAQ, fetchFriends])

    const handleOpenModal = () => {
        reset()
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
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
                <PartnersCarousel title={t('content.partnersTitle')} />
                {
                    Array.isArray(data.friends) && data.friends.length > 0 && (
                        <div className={s.friends}>
                            <h3>{t('content.friendsTitle')}</h3>
                            <div className={s.friendsList}>
                                {data.friends.length > 0 && (
                                    <div className={s.friendsItem} onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                                        <p>
                                            {t('content.joinUsText')}
                                        </p>
                                        <svg width="71" height="70" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M67.5626 32.0614C66.7428 32.0614 66.0482 32.346 65.4789 32.9153C64.9096 33.4846 64.625 34.1791 64.625 34.9989C64.625 39.0068 63.8507 42.7869 62.3023 46.3393C60.7993 49.8918 58.7271 52.9887 56.0855 55.6303C53.444 58.2718 50.347 60.3441 46.7946 61.847C43.2877 63.3955 39.5076 64.1697 35.4542 64.1697C31.4463 64.1697 27.6662 63.3955 24.1138 61.847C20.6069 60.3441 17.5327 58.2718 14.8912 55.6303C12.2496 52.9887 10.1546 49.8918 8.60613 46.3393C7.10318 42.7869 6.35171 39.0068 6.35171 34.9989C6.35171 30.9911 7.10318 27.2109 8.60613 23.6585C10.1546 20.1061 12.2496 17.0091 14.8912 14.3676C17.5327 11.7261 20.6069 9.65381 24.1138 8.15087C27.6662 6.60238 31.4463 5.82813 35.4542 5.82813C37.4126 5.82813 39.3482 6.03308 41.261 6.44297C43.1283 6.80733 44.9387 7.35385 46.6921 8.08255C48.4456 8.81125 50.1193 9.69936 51.7133 10.7469C53.3074 11.8399 54.7875 13.0696 56.1538 14.4359C56.7459 15.028 57.4405 15.324 58.2375 15.324C59.0345 15.324 59.7063 15.0508 60.2528 14.5042C60.8449 13.9122 61.1409 13.2176 61.1409 12.4206C61.1409 11.6236 60.8676 10.929 60.3211 10.337C58.636 8.69739 56.837 7.21722 54.9242 5.89645C53.0113 4.62122 51.0074 3.55094 48.9124 2.68562C46.8174 1.82028 44.6313 1.1599 42.3541 0.70446C40.1224 0.249023 37.8225 0.0213013 35.4542 0.0213013C30.6266 0.0213013 26.0949 0.932175 21.8594 2.75393C17.6238 4.62122 13.9234 7.13752 10.7581 10.3028C7.59278 13.4681 5.09926 17.1685 3.27751 21.4041C1.41021 25.6397 0.476562 30.1713 0.476562 34.9989C0.476562 39.8266 1.41021 44.3582 3.27751 48.5938C5.09926 52.8293 7.59278 56.5298 10.7581 59.6951C13.9234 62.8603 17.6238 65.3766 21.8594 67.2439C26.0949 69.0657 30.6266 69.9766 35.4542 69.9766C40.2818 69.9766 44.8134 69.0657 49.049 67.2439C53.3301 65.3766 57.0533 62.8603 60.2186 59.6951C63.3839 56.5298 65.8774 52.8293 67.6992 48.5938C69.521 44.3582 70.4318 39.8266 70.4318 34.9989C70.4318 34.1791 70.1472 33.4846 69.5779 32.9153C69.0086 32.346 68.3368 32.0614 67.5626 32.0614ZM47.1362 32.0614H38.3918V23.3169C38.3918 22.5427 38.1071 21.8709 37.5378 21.3016C36.9685 20.7323 36.274 20.4477 35.4542 20.4477C34.6799 20.4477 34.0082 20.7323 33.4389 21.3016C32.8696 21.8709 32.5849 22.5427 32.5849 23.3169V32.0614H23.8405C23.0207 32.0614 22.3262 32.346 21.7569 32.9153C21.1876 33.4846 20.903 34.1791 20.903 34.9989C20.903 35.8187 21.1876 36.5133 21.7569 37.0826C22.3262 37.6519 23.0207 37.9365 23.8405 37.9365H32.5849V46.6809C32.5849 47.4552 32.8696 48.1269 33.4389 48.6962C34.0082 49.2655 34.6799 49.5502 35.4542 49.5502C36.274 49.5502 36.9685 49.2655 37.5378 48.6962C38.1071 48.1269 38.3918 47.4552 38.3918 46.6809V37.9365H47.1362C47.956 37.9365 48.6505 37.6519 49.2198 37.0826C49.7891 36.5133 50.0737 35.8187 50.0737 34.9989C50.0737 34.1791 49.7891 33.4846 49.2198 32.9153C48.6505 32.346 47.956 32.0614 47.1362 32.0614Z" fill="#00ABEC" />
                                        </svg>
                                    </div>
                                )
                                }
                                {
                                    data.friends.map((friend: any) => (
                                        <FriendsCard key={friend.id} friend={friend} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                <div className={s.donationForm}>
                    <DonationForm />
                </div>
                <div className={s.feedbackForm}>
                    <OurFriendsFeedbackForm 
                        title={t('form.title')} 
                        description={t('form.description')}
                        translationKey="contacts.feedbackForm"
                        recipientEmail="info@soskyrgyzstan.kg"
                    />
                </div>

            </div>
            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}

export default OurFriendsFriendsPage