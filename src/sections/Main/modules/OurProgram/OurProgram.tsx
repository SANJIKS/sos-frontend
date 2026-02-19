'use client'

import React from 'react'
import {useTranslations} from 'next-intl'
import s from './OurProgram.module.scss'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import {Link} from '@/i18n/navigation'

// 1. Импорт компонентов и стилей Swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const OurProgram = () => {
    const t = useTranslations('ourProgram')
    
    const cards = [
        {
            title: t('cards.0.title'),
        },
        {
            title: t('cards.1.title'),
        },
        {
            title: t('cards.2.title'),
        },
    ]

    return (
        <section className={s.ourProgram}>
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>

            <div>
                <Swiper
                    modules={[Navigation,  Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 8
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {
                        cards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <div className={s.card}>
                                    <div className={s.image}>
                                        <Image src={`/image/main/main-${index}.jpg`} alt={card.title} fill objectFit='cover' />
                                        <h4>{card.title}</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <Link href={'/programs'} className={s.link}>
                <Button>{t('learnMore')}</Button>
            </Link>
        </section>
    )
}

export default OurProgram