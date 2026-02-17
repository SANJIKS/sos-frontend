'use client'

import React from 'react'
import {useTranslations} from 'next-intl'
import s from './Achievemeants.module.scss'
import Button from '@/shared/ui/Button/Button'
import {Link} from '@/i18n/navigation'
import Image from 'next/image'

// 1. Импорт компонентов и стилей Swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Achievemeants = () => {
    const t = useTranslations('achievements')

    const data = [
        {
            title: t('items.0.title'),
            description: t('items.0.description')
        },
        {
            title: t('items.1.title'),
            description: t('items.1.description')
        },
        {
            title: t('items.2.title'),
            description: t('items.2.description')
        }
    ]

    return (
        <section>
            <div className={s.achievemeants}>
                <h1>{t('title')}</h1>
                <div className={s.items}>
                    {data.map((item, i) => (
                        <div className={s.blocks} key={i}>
                            <Image
                                src={`/icons/achievemeants/vector-${i + 1}.svg`}
                                alt="icon"
                                width={200}
                                height={200}
                            />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <Link href={'about/foundation-history'} className={s.link}>
                    <Button>{t('learnMore')}</Button>
                </Link>
            </div>

            <div className={s.achievemeantsMobile}>
                <h1>{t('title')}</h1>
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
                            data.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className={s.blocks} key={i}>
                                        <Image
                                            src={`/icons/achievemeants/vector-${i + 1}.svg`}
                                            alt="icon"
                                            width={140}
                                            height={140}
                                        />
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <Link href={'about/foundation-history'} className={s.link}>
                    <Button>{t('learnMore')}</Button>
                </Link>
            </div>
        </section>
    )
}

export default Achievemeants