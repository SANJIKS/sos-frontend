// 'use client'

import React from 'react'
import s from './DetailedDonationPage.module.scss'
import Image from 'next/image'
import {IDonationOption} from '@/shared/types/donation'
import Button from '@/shared/ui/Button/Button'

interface Props {
    option: IDonationOption
}

const DonationDetailsPage = ({option}: Props) => {
    return (
        <div className={s.donation}>
            <div className={s.header}>
                {/* Картинка */}
                {option.image && (
                    <div className={s.imageWrapper}>
                        <Image
                            src={option.image}
                            alt={option.title || '-'}
                            width={600}
                            height={400}
                            className={s.image}
                        />
                    </div>
                )}

                {/* Текст */}
                <div className={s.textWrapper}>
                    <span>{option.option_type_display || '-'}</span>
                    <h1>{option.title || '-'}</h1>
                    <p>{option.description || '-'}</p>

                    <div className={s.item}>
                        <h3>Описание</h3>
                        <p>{option.detailed_description || '-'}</p>
                    </div>

                    <div className={s.item}>
                        <h3>Условия</h3>
                        <p>{option.requirements || '-'}</p>
                    </div>

                    <div className={s.item}>
                        <h3>Преимущества</h3>
                        <p>{option.benefits || '-'}</p>
                    </div>

                    <div className={s.item}>
                        <h3>Минимальная сумма</h3>
                        <p>{option.min_amount || '-'}</p>
                    </div>

                    <div className={s.item}>
                        <h3>Статус</h3>
                        <p>{option.status_display || '-'}</p>
                    </div>

                    {/* Кнопка */}
                    {/*<a*/}
                    {/*    href={option.button_url || '#'}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*    className={s.button}*/}
                    {/*>*/}
                    {/*    {option.button_text || '-'}*/}
                    {/*</a>*/}
                    <Button>
                        {option.button_text || '-'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DonationDetailsPage
