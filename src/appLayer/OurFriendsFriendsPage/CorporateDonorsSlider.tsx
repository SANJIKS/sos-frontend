'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import s from './CorporateDonorsSlider.module.scss'
import { useLocale } from 'next-intl'

const titles: Record<string, string> = {
    ru: 'Наши корпоративные доноры',
    ky: 'Биздин корпоративдик донорлор',
    en: 'Our Corporate Donors',
}

const donors = [
    { name: 'Тойбосс',               file: 'Тойбосс.png' },
    { name: 'Умай Групп',             file: 'umai logo cobr.svg' },
    { name: 'Дос-Кредобанк',          file: 'doscredobank.PNG' },
    { name: 'UBS Transit',            file: 'UBS transit.png' },
    { name: 'Вымпел – Щит',           file: 'Вымпел щит.jpg' },
    { name: 'Прогресс Инжиниринг',    file: 'Прогресс Инжиниринг.png' },
    { name: 'Берекет Куш',            file: 'Берекет куш.jpg' },
    { name: 'БишкекЭлектро',          file: 'Bielpower.svg' },
    { name: 'Wasabi sushi',           file: 'Wasabi.png' },
    { name: 'Байкал Секьюрити',       file: 'Байкал Секьюрити.jpg' },
    { name: 'Миртрал',                file: 'Миртрал.jpg' },
    { name: 'Ширин',                  file: 'Ширин.png' },
    { name: 'Шин-лайн',               file: 'шинлайн.png' },
    { name: 'Куликов',                file: 'куликов.png' },
    { name: 'Шоро',                   file: 'шоро.png' },
    { name: 'Codify',                 file: 'codify.svg' },
    { name: 'Иллюзион',               file: 'illuzion.jpg' },
    { name: 'Broadway',               file: 'broadway.jpg' },
    { name: 'Аквапарк Ала-Тоо',      file: 'ala-too.jpg' },
]

const CorporateDonorsSlider = () => {
    const locale = useLocale()
    const title = titles[locale] ?? titles['ru']

    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>{title}</h3>
            <div className={s.swiperWrap}>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={24}
                    slidesPerView={3}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 2,   spaceBetween: 12 },
                        640: { slidesPerView: 3,   spaceBetween: 16 },
                        1024: { slidesPerView: 4,  spaceBetween: 20 },
                    }}
                    className={s.swiper}
                >
                    {donors.map((donor, i) => (
                        <SwiperSlide key={i}>
                            <div className={s.card}>
                                <div className={s.imgWrap}>
                                    <Image
                                        src={`/fwd2/${donor.file}`}
                                        alt={donor.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '14px' }}
                                    />
                                </div>
                                <p className={s.name}>{donor.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default CorporateDonorsSlider