'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import s from './CorporateDonorsSlider.module.scss'
import { useLocale } from 'next-intl'

const titles: Record<string, string> = {
    ru: 'Наши корпоративные доноры',
    ky: 'Биздин корпоративдик донорлор',
    en: 'Our corporate Donors',
}

const donors = [
        { name: 'ОсОО "Адал азык" (ТМ Тойбосс)', file: 'Тойбосс.png' },
        { name: 'ОсОО «Умай Групп»', file: 'umai logo cobr.svg' },
        { name: 'Дос-Кредобанк', file: 'doscredobank.PNG' },
        { name: 'UBS Transit', file: 'UBS transit.png' },
        { name: 'ОсОО «Вымпел – Щит»', file: 'Вымпел щит.jpg' },
        { name: 'ОсОО «Прогресс Инжиниринг»', file: 'Прогресс Инжиниринг.png' },
        { name: 'КХ «Берекет Куш»', file: 'Берекет куш.jpg' },
        { name: 'Осоо «БишкекЭлектро» (bielpower)', file: 'Bielpower.svg' },
        { name: 'Wasabi sushi', file: 'Wasabi.png' },
        { name: 'Байкал Секьюрити', file: 'Байкал Секьюрити.jpg' },
        { name: 'Миртрал', file: 'Миртрал.jpg' },
        { name: 'Ширин', file: 'Ширин.png' },
        { name: 'Шин-лайн', file: 'шинлайн.png' },
        { name: 'Куликов', file: 'куликов.png' },
        { name: 'Шоро', file: 'шоро.png' },
        { name: 'Codify', file: 'codify.svg' },
        { name: 'Иллюзион', file: 'illuzion.jpg' },
        { name: 'Broadway', file: 'broadway.jpg' },
        { name: 'Аквапарк Ала-Тоо', file: 'ala-too.jpg' },
]

const breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 5, spaceBetween: 30 },
}

const CorporateDonorsSlider = () => {
    const locale = useLocale()
    const title = titles[locale] ?? titles['ru']

    return (
        <div className={s.slider}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.blocks}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    loop={true}
                    speed={2500}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={breakpoints}
                >
                    {donors.map((donor, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={`/fwd2/${donor.file}`}
                                alt={donor.name}
                                width={200}
                                height={80}
                                className={s.image}
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
                    autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
                    breakpoints={breakpoints}
                >
                    {donors.map((donor, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={`/fwd2/${donor.file}`}
                                alt={donor.name}
                                width={200}
                                height={80}
                                className={s.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default CorporateDonorsSlider
