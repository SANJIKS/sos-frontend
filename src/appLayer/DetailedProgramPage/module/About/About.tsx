'use client'

import React, {FC} from 'react'
import {useTranslations} from 'next-intl'
import s from './About.module.scss'
import Image from 'next/image'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {IProgram} from '@/shared/types/program'

interface AboutProps {
    program: IProgram
}

const About: FC<AboutProps> = (props) => {
    const {program} = props
    const t = useTranslations('detailedProgramPage')
    
    return (
        <section className={s.container}>
            <div className={s.about}>
                <div className={s.image}>
                    <span className={s.block}/>
                    <Image
                        src={program.image || `/image/program/siblings.jpg`}
                        alt={program.title}
                        fill
                        objectFit="cover"
                        blurDataURL={`//image/program/siblings.jpg`}
                        className={s.img}
                    />
                </div>
                <div className={s.text}>
                    <h1>{t('about.title')}</h1>
                    <p>{program.description}</p>
                </div>
            </div>

            <h2 className={s.howTitle}>{t('howItWorks.title')}</h2>
            <div className={s.swiperWrapper}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={25}
                    slidesPerView={4}
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
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className={s.storiesSwiper}
                >
                    {
                        program.steps.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className={s.how}>
                                    <span className={s.number}> 0{i + 1}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <div className={s.description}>
                <div className={s.descriptionText}>
                    <div>
                        <Image
                            src={'/icons/foundation-history/Success-story-vector.svg'}
                            alt="item"
                            width={64}
                            height={47}
                            blurDataURL={'/icons/foundation-history/SuccessStory-vector.svg'}
                        />
                    </div>
                    <span>
               <h3>{program.author_name}</h3>
              <p>{program.author_title}</p>
            </span>
                </div>
                <div className={s.descriptionImage}>

                </div>
            </div>

            <h4 className={s.videoTitle}>{t('video.title')}</h4>
            <div className={s.videoWrapper}>
                <iframe
                    src={program.video_url || "https://www.youtube.com/embed/kxYIBeVc8RQ" }
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    )
}

export default About
