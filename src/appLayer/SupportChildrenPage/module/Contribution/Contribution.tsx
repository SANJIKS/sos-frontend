'use client'

import React, {useEffect} from 'react'
import { useTranslations } from 'next-intl'
import s from './Contribution.module.scss'
import Image from 'next/image'
import {Link} from '@/i18n/navigation'
import Button from '@/shared/ui/Button/Button'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {useContributionStore} from '@/store/useContributionStore'

const Contribution = () => {
    const t = useTranslations('supportChildrenPage.contribution')
    const { contributions, loading, error, fetchContributions } = useContributionStore()

    useEffect(() => {
        fetchContributions()
    }, [fetchContributions])

    return (
        <section className={s.contribution}>
            <p className={s.title}>{t('title')}</p>
            <div className={s.blocks}>
                {contributions.map((item, i) => {
                    return (
                        <ul key={i}>
                            <li>
              <span>
                <Image
                    src={ item.image || `/image/support/support-${i + 1}.jpg`}
                    alt="item"
                    fill
                    objectFit="cover"
                    blurDataURL={`/image/support/support-${i + 2}.jpg`}
                />
              </span>
                                <div className={s.item}>
                                    <p>{item.title}</p>
                                </div>
                            </li>
                            <p className={s.description}>{item.description}</p>
                            <Link href={`/support-children/${item.id}`}>
                                <Button className={s.btn}>{t('learnMore')}</Button>
                            </Link>
                        </ul>
                    )
                })}
            </div>
            <div className={s.swiperWrapper}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false
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
                            slidesPerView: 2,
                            spaceBetween: 30
                        }
                    }}
                    className={s.blocksMobile}
                >
                    {
                        contributions.map((item, i) => (
                            <SwiperSlide key={i}>
                                <ul>
                                    <li>
                                    <span>
                                        <Image
                                            src={ item.image || `/image/support/support-${i + 1}.jpg`}
                                            alt="item"
                                            fill
                                            objectFit="cover"
                                            blurDataURL={`/image/support/support-${i + 2}.jpg`}
                                        />
                                    </span>
                                        <div className={s.item}>
                                            <p>{item.title}</p>
                                        </div>
                                    </li>
                                    <p className={s.description}>{item.description}</p>
                                    <Link href={`/support-children/${item.id}`}>
                                        <Button className={s.btn}>{t('learnMore')}</Button>
                                    </Link>
                                </ul>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Contribution
