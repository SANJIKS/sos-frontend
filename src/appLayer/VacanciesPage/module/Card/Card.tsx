import React from 'react';
import s from './Card.module.scss'
import { WiTime5 } from "react-icons/wi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { vacancyType } from '../../type';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Card = ({ vacancy }: { vacancy: vacancyType }) => {
    const t = useTranslations('vacanciesPage.card')

    const formatDeadline = (input: string | Date): string => {
        const d = new Date(input)
        const year = d.getUTCFullYear()
        const month = String(d.getUTCMonth() + 1).padStart(2, '0')
        const day = String(d.getUTCDate()).padStart(2, '0')
        return `${day}.${month}.${year}`
    }

    const deadlineFormatted = vacancy?.deadline ? formatDeadline(vacancy.deadline) : ''
    return (
        <div className={s.card}>
            <div className={s.nav}>
                <span>
                    <p><HiOutlineLocationMarker />{vacancy.address}</p>
                    <p> <WiTime5 fill={"#1C325D"} /> {vacancy.work_schedule}</p>
                </span>
                {deadlineFormatted && <p>{t('deadline', { date: deadlineFormatted })}</p>}
            </div>
            <h3>{vacancy.title}</h3>
            <p>{vacancy.description}</p>
            <Link href={`/our-friends/form`}>
                <button>{t('apply')}</button>
            </Link>
        </div>
    )
}
export default Card;