'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import s from './SuccessStories.module.scss'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SuccessStory } from '@/store/donatePageStore'
import { Link } from '@/i18n/navigation'



const SuccessStories = ({ stories }: { stories: SuccessStory[] }) => {
    const t = useTranslations('successStories')

    if (!stories) {
        return null
    }
    return (
        <div className={s.successStories}>
            <h3>{t('title')}</h3>
            <div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {
                        stories.map((story, index) => (
                            <SwiperSlide key={index}>
                                <div className={s.card}>
                                    <div className={s.image}>
                                        {
                                            story.author_image == null ?
                                                <Image src={`/image/donate/success-stories-item-${index % 3}.jpg`} alt={story.title || 'image'} fill objectFit='cover' /> : <Image src={story.author_image} alt={story.title || 'image'} fill objectFit='cover' />

                                        }
                                        <h4>{story.title}</h4>
                                    </div>
                                    <p>{story.quote_text}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


            <Link href={'/our-friends/friends'} className={s.button}>
                <button>{t('button')}</button>
            </Link>
        </div>
    )
}

export default SuccessStories