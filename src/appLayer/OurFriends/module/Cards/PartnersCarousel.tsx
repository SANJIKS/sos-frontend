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
    id: number;
    name: string;
    category: string;
    logo: string | null;
    created_at: string;
    updated_at: string;
};

type PartnersResponse = {
    data: Partner[];
    error: string | null;
    success: boolean;
};

const PartnersCarousel = ({ title, category }: { title: string, category?: string }) => {
    const { locale }: { locale: string } = useParams()
    const t = useTranslations('ourFriendsFriendsPage.carousel')
    const [partners, setPartners] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true)
                setHasError(false)

                const searchParams = new URLSearchParams();
                searchParams.append('lang', locale || 'ru');
                if (category) {
                    searchParams.append('category', category);
                }
                const url = `/partners?${searchParams.toString()}`;
                const response = await $apiClient.get<PartnersResponse>(url);

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setPartners(response.data)
                } else {
                    setPartners([])
                }
            } catch {
                setHasError(true)
                setPartners([])
            } finally {
                setLoading(false)
            }
        }

        if (locale) {
            fetchPartners()
        }
    }, [locale, category])

    if (loading) {
        return (
            <div className={s.partnersCarousel}>
                <h3>{title}</h3>
                <div className={s.loading}>{t('loading')}</div>
            </div>
        )
    }

    if (hasError) {
        return (
            <div className={s.partnersCarousel}>
                <h3>{title}</h3>
                <div className={s.error}>{t('error')}</div>
            </div>
        )
    }

    if (partners.length === 0) {
        return null
    }

    return (
        <div className={s.partnersCarousel}>
            <h3>{title}</h3>
            <div className={s.carouselContainer}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
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
                    className={s.swiper}
                >
                    {partners.map((partner: Partner) => (
                        <SwiperSlide key={partner.id}>
                            <div className={s.partnerCard}>
                                <div className={s.cardContent}>
                                    {partner.logo && (
                                        <div className={s.logoContainer}>
                                            <img src={partner.logo || ''} alt={partner.name} />
                                        </div>
                                    )}
                                    <div className={s.partnerName}>
                                        {partner.name}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default PartnersCarousel
