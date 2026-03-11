'use client'

import React, {useEffect} from 'react'
import {useTranslations} from 'next-intl'
import s from './Requisite.module.scss'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import {useRequisitesStore} from '@/store/useRequisitesStore'

const Requisite = () => {
    const t = useTranslations('supportChildrenPage.requisites')
    const {requisites, qrCodes, fetchQrCodes, loading, error, fetchRequisites} = useRequisitesStore()

    useEffect(() => {
        fetchRequisites()
        fetchQrCodes()
    }, [])

    if (loading) return <p>{t('loading')}</p>

    if (error) {
        const errorMessage = typeof error === 'object' && error !== null
            ? ((error as { message?: string }).message || JSON.stringify(error))
            : String(error);

        return <p>{t('error')}: {errorMessage}</p>
    }

    const mainCity = requisites?.filter((r) => r.organization_type === 'main_foundation') || []
    const otherCities = requisites?.filter((r) => r.organization_type !== 'main_foundation') || []

    return (
        <section className={s.container}>
            <h1 className={s.title}>{t('title')}</h1>
            <p className={s.description}>{t('mainDescription')}</p>

            {/* Main city swiper */}
            <div className={s.swiperContainer}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    className={s.swiper}
                    breakpoints={{
                        320: {slidesPerView: 1, spaceBetween: 10},
                        768: {slidesPerView: 2, spaceBetween: 20},
                        1024: {slidesPerView: 3, spaceBetween: 30}
                    }}
                >
                    {mainCity.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={s.box}>
                                <p className={s.boxTitle}>{item.currency_display || item.currency}</p>
                                <h2 className={s.boxDescription}>{item.title}</h2>

                                {item.bank_name && (
                                    <p className={s.boxField}>{item.bank_name}</p>
                                )}
                                {item.account_number && (
                                    <p className={s.boxField}>
                                        Расчетный счет: {item.account_number}
                                    </p>
                                )}
                                {item.bik && (
                                    <p className={s.boxField}>БИК: {item.bik}</p>
                                )}
                                {item.swift && (
                                    <p className={s.boxField}>
                                        SWIFT БАНКА ПОЛУЧАТЕЛЯ: {item.swift}
                                    </p>
                                )}
                                {item.inn && (
                                    <p className={s.boxField}>ИНН {item.inn}</p>
                                )}
                                {item.okpo && (
                                    <p className={s.boxField}>ОКПО {item.okpo}</p>
                                )}
                                {item.tax_office && (
                                    <p className={s.boxField}>{item.tax_office}</p>
                                )}
                                {item.correspondent_bank && (
                                    <>
                                        <p className={s.boxField}>БАНК КОРРЕСПОНДЕНТ:</p>
                                        <p className={s.boxField}>{item.correspondent_bank}</p>
                                    </>
                                )}
                                {item.correspondent_swift && (
                                    <p className={s.boxField}>
                                        SWIFT BIC: {item.correspondent_swift}
                                    </p>
                                )}
                                {item.correspondent_address && (
                                    <p className={s.boxField}>
                                        Address: {item.correspondent_address}
                                    </p>
                                )}
                                {item.correspondent_account && (
                                    <p className={s.boxField}>
                                        Correspondent account of DemirBank: {item.correspondent_account}
                                    </p>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Other cities swiper */}
            <p className={s.description}>{t('otherCities')}</p>
            <div className={s.swiperContainer}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    className={s.swiper}
                    breakpoints={{
                        320: {slidesPerView: 1, spaceBetween: 10},
                        768: {slidesPerView: 2, spaceBetween: 20},
                        1024: {slidesPerView: 3, spaceBetween: 30}
                    }}
                >
                    {otherCities.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={s.box}>
                                <p className={s.boxTitle}>{item.currency_display || item.currency}</p>
                                <h2 className={s.boxDescription}>{item.title}</h2>

                                {item.bank_name && (
                                    <p className={s.boxField}>{item.bank_name}</p>
                                )}
                                {item.account_number && (
                                    <p className={s.boxField}>
                                        Расчетный счет: {item.account_number}
                                    </p>
                                )}
                                {item.bik && (
                                    <p className={s.boxField}>БИК: {item.bik}</p>
                                )}
                                {item.swift && (
                                    <p className={s.boxField}>
                                        SWIFT БАНКА ПОЛУЧАТЕЛЯ: {item.swift}
                                    </p>
                                )}
                                {item.inn && (
                                    <p className={s.boxField}>ИНН: {item.inn}</p>
                                )}
                                {item.okpo && (
                                    <p className={s.boxField}>ОКПО: {item.okpo}</p>
                                )}
                                {item.tax_office && (
                                    <p className={s.boxField}>{item.tax_office}</p>
                                )}
                                {item.correspondent_bank && (
                                    <>
                                        <p className={s.boxField}>БАНК КОРРЕСПОНДЕНТ:</p>
                                        <p className={s.boxField}>{item.correspondent_bank}</p>
                                    </>
                                )}
                                {item.correspondent_swift && (
                                    <p className={s.boxField}>
                                        SWIFT BIC: {item.correspondent_swift}
                                    </p>
                                )}
                                {item.correspondent_address && (
                                    <p className={s.boxField}>
                                        Address: {item.correspondent_address}
                                    </p>
                                )}
                                {item.correspondent_account && (
                                    <p className={s.boxField}>
                                        Correspondent account of DemirBank: {item.correspondent_account}
                                    </p>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* QR code */}
            <p className={s.description}>{t('qrTransfer')}</p>
            <div className={s.qrBox}>
                {qrCodes.map((qr) => (
                    <div key={qr.id} className={s.qr}>
                        <Image
                            src={qr.qr_code}
                            alt={`QR code ${qr.id}`}
                            fill
                            objectFit="cover"
                            className={s.img}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Requisite