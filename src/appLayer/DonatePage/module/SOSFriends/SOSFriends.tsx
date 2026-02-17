'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import s from './SOSFriends.module.scss'
// 1. Импорт Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FriendsCard } from '@/shared/ui/Cards'

const SOSFriends = ({ friends }: any) => {
    
    const t = useTranslations('sosFriends')

    if (friends.length === 0) {
        return null
    }

    // const friendss = (t.raw('friends') as Friend[]).map((friend, index) => ({
    //     ...friend,
    //     image: `/path/to/your/image-${index + 1}.jpg`
    // }));

    return (
        <section className={s.sosFriends}>
            <div className={s.title}>
                <h3>{t('title')}</h3>
                <p>{t('subtitle')}</p>
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    className={s.friendsSwiper}
                >
                    {friends.map((friend: any,) => (
                        <SwiperSlide key={friend.id}>
                            <FriendsCard friend={friend} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default SOSFriends;
