'use client'

import React, { useEffect, useState } from 'react'
import s from './PartnersCarousel.module.scss'
import { $apiClient } from '@/shared/api/api_client'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Partner = {
    id: number
    name: string
    category: string
    logo: string | null
    created_at: string
    updated_at: string
}

// Fallback данные если бэк пустой
const FALLBACK_DONORS = [
    { id: 1,  name: 'ОсОО "Адал азык" (ТМ Тойбосс)', logo: '/image/partner/Тойбосс.png' },
    { id: 2,  name: 'ОсОО «Умай Групп»',              logo: '/image/partner/umai logo cobr.svg' },
    { id: 3,  name: 'Дос-Кредобанк',                  logo: '/image/partner/doscredobank.PNG' },
    { id: 4,  name: 'UBS Transit',                    logo: '/image/partner/UBS transit.png' },
    { id: 5,  name: 'ОсОО «Вымпел – Щит»',            logo: '/image/partner/Вымпел щит.jpg' },
    { id: 6,  name: 'ОсОО «Прогресс Инжиниринг»',     logo: '/image/partner/Прогресс Инжиниринг.png' },
    { id: 7,  name: 'КХ «Берекет Куш»',               logo: '/image/partner/Берекет куш.jpg' },
    { id: 8,  name: 'ОсОО «БишкекЭлектро»',           logo: '/image/partner/Bielpower.svg' },
    { id: 9,  name: 'Wasabi sushi',                   logo: '/image/partner/Wasabi.png' },
    { id: 10, name: 'Байкал Секьюрити',               logo: '/image/partner/Байкал Секьюрити.jpg' },
    { id: 11, name: 'Миртрал',                        logo: '/image/partner/Миртрал.jpg' },
    { id: 12, name: 'Ширин',                          logo: '/image/partner/Ширин.png' },
    { id: 13, name: 'Шин-лайн',                       logo: '/image/partner/шинлайн.png' },
    { id: 14, name: 'Куликов',                        logo: '/image/partner/куликов.png' },
    { id: 15, name: 'Шоро',                           logo: '/image/partner/шоро.png' },
    { id: 16, name: 'Codify',                         logo: '/image/partner/codify.svg' },
    { id: 17, name: 'Иллюзион',                       logo: '/image/partner/illuzion.jpg' },
    { id: 18, name: 'Broadway',                       logo: '/image/partner/broadway.jpg' },
    { id: 19, name: 'Аквапарк Ала-Тоо',              logo: '/image/partner/ala-too.jpg' },
]

const PartnersCarousel = ({ title, category }: { title: string; category?: string }) => {
    const { locale }: { locale: string } = useParams()
    const t = useTranslations('ourFriendsFriendsPage.carousel')
    const [partners, setPartners] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true)
                const searchParams = new URLSearchParams()
                searchParams.append('lang', locale || 'ru')
                if (category) searchParams.append('category', category)

                const response = await $apiClient.get<Partner[]>(`/partners?${searchParams.toString()}`)

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setPartners(response.data)
                } else {
                    // Бэк пустой — используем fallback
                    setPartners(FALLBACK_DONORS as Partner[])
                }
            } catch {
                // Ошибка — тоже fallback
                setPartners(FALLBACK_DONORS as Partner[])
            } finally {
                setLoading(false)
            }
        }

        fetchPartners()
    }, [locale, category])

    if (loading) {
        return (
            <div className={s.partnersCarousel}>
                <h3>{title}</h3>
                <div className={s.loading}>{t('loading')}</div>
            </div>
        )
    }

    return (
        <div className={s.partnersCarousel}>
            <h3>{title}</h3>

            {/* Ряд 1 — вперёд */}
            <div className={s.row}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={4}
                    loop={true}
                    speed={3000}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className={s.swiper}
                >
                    {partners.map((partner) => (
                        <SwiperSlide key={partner.id}>
                            <div className={s.partnerCard}>
                                {partner.logo
                                    ? <img src={partner.logo} alt={partner.name} className={s.logo} />
                                    : <span className={s.noLogo}>{partner.name}</span>
                                }
                                <p className={s.partnerName}>{partner.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Ряд 2 — назад */}
            <div className={s.row}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={4}
                    loop={true}
                    speed={3000}
                    autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className={s.swiper}
                >
                    {[...partners].reverse().map((partner) => (
                        <SwiperSlide key={partner.id}>
                            <div className={s.partnerCard}>
                                {partner.logo
                                    ? <img src={partner.logo} alt={partner.name} className={s.logo} />
                                    : <span className={s.noLogo}>{partner.name}</span>
                                }
                                <p className={s.partnerName}>{partner.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default PartnersCarousel