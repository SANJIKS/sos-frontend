'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import s from './Blocks.module.scss'
import Image from 'next/image'
import Button from '@/shared/ui/Button/Button'
import { Link } from '@/i18n/navigation'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useProgramsStore } from '@/store/useProgramsStore'

const Blocks = () => {
    const t = useTranslations('programmePage.blocks')
    const { programs, fetchPrograms } = useProgramsStore()

    useEffect(() => {

        fetchPrograms()

    }, [fetchPrograms])
    if (!programs.length) return <p>{t('noData')}</p>

    return (
        <section className={s.blocks}>
            <div className={`${s.blocks} ${s.blocksDesktop}`}>
                {programs.map((item, i) => {
                    return (
                        <ul key={i}>
                            <li>
                                <span>
                                    <Image
                                        src={item.image || `/image/program/program-${i + 1}.jpg`}
                                        alt="item"
                                        fill
                                        objectFit="cover"
                                        blurDataURL={`/image/fond/background-${i + 2}.jpg`}
                                    />
                                </span>
                                <div className={s.item}>

                                    <p>{item.title}</p>
                                </div>
                            </li>
                            <p className={s.description}>{item.description}</p>
                            <Link href={`/programs/${item.uuid}`}>
                                <Button className={s.btn}>{t('learnMore')}</Button>
                            </Link>
                        </ul>
                    )
                })}
            </div>

            <div className={`${s.blocks} ${s.blocksMobile}`}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    // speed={2500}
                    autoplay={{
                        // delay: 3000,
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
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {programs.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <ul>
                                    <li>
                                        <span>
                                            <Image
                                                src={item.image || `/image/program/program-${i + 1}.jpg`}
                                                alt="item"
                                                fill
                                                objectFit="cover"
                                                blurDataURL={`/image/fond/background-${i + 2}.jpg`}
                                            />
                                        </span>
                                        <div className={s.item}>
                                            {/* <Image
                                                src={item.icon || `/icons/program/content-${i + 1}.svg`}
                                                alt="icon"
                                                width={36}
                                                height={36}
                                            /> */}
                                            <p>{item.title}</p>
                                        </div>
                                    </li>
                                    <p className={s.description}>{item.description}</p>
                                    <Link href={`/programs/${item.uuid}`}>
                                        <Button className={s.btn}>{t('learnMore')}</Button>
                                    </Link>
                                </ul>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

export default Blocks
