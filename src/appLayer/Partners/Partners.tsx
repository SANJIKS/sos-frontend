'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import s from './Partners.module.scss'
import Image from 'next/image'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Partners = () => {
    const t = useTranslations('partners')
    
    // Массив партнеров с их именами и расширениями файлов
    const partners = [
        { name: 'ОсОО "Адал азык" (ТМ Тойбосс)', file: 'partner-1.svg' },
        { name: 'Дос-Кредобанк', file: 'partner-3.PNG' },
        { name: 'UBS Transit', file: 'partner-4.png' },
        { name: 'ОсОО «Вымпел – Щит»', file: 'partner-5.png' },
        { name: 'ОсОО «Прогресс Инжиниринг»', file: 'partner-6.jpg' },
        { name: 'КХ «Берекет Куш»', file: 'partner-7.jpg' },
        { name: 'Осоо «БишкекЭлектро» (bielpower)', file: 'partner-8.svg' },
        { name: 'Wasabi sushi', file: 'partner-9.jpg' },
        { name: 'Байкал Секьюрити', file: 'partner-10.svg' },
        { name: 'Ширин', file: 'partner-12.jpg' },
        { name: 'Шин-лайн', file: 'partner-13.jpg' },
        { name: 'Куликов', file: 'partner-14.jpg' },
        { name: 'Шоро', file: 'partner-15.png' },
        { name: 'Codify', file: 'partner-16.png' },
        { name: 'Иллюзион', file: 'partner-17.png' },
        { name: 'Аквапарк Ала-Тоо', file: 'partner-19.png' },
    ]
    
    return (
        <div className={s.partners}>
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
            <div className={s.blocks}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    loop={true}
                    speed={2500}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {partners.map((partner, i) => (
                        <SwiperSlide key={i}>
                                <Image
                                    src={`/fwd/${partner.file}`}
                                    alt={partner.name}
                                    width={200}
                                    height={80}
                                    className={s.images}
                                />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={s.blocksTwo}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={6}
                    loop={true}
                    speed={2500}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        reverseDirection: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {partners.map((partner, i) => (
                        <SwiperSlide key={i} >
                                <Image
                                    src={`/fwd/${partner.file}`}
                                    alt={partner.name}
                                    width={200}
                                    height={80}
                                    className={s.images}
                                />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Partners
