"use client"
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay } from 'swiper/modules';
import './Swiper.scss'
import Image from 'next/image';
import { NewsImage } from '../../type';

const SwiperNews = ({images}:{images: NewsImage[]}) => {
    return (
        <div className='swiper-news'>
            <div className='swiper-news-container'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    content='center'
                    loop={images?.length > 3 ? true : false}
                    modules={[Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {
                        images?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide-content'>
                                    <Image src={image.image} alt="news" objectFit="cover" fill />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperNews;