'use client'

import React, {useEffect} from 'react'
import s from './Blocks.module.scss'
import Image from 'next/image'
import Button from '@/shared/ui/Button/Button'
import {Link} from '@/i18n/navigation'
import {useMetricsStore} from '@/store/useMetricsStore'

const data = [
    {
        title: 'Альтернативный уход',
        description:
            'Помощь детям, оставшимся без родительской опеки, через приёмные семьи и семью SOS. Мы создаём крепкие, любящие семейные ячейки, где каждый ребёнок чувствует себя в безопасности.',
        slug: 'alternative-care'
    },
    {
        title: 'Превенция',
        description:
            'Поддержка семей в кризисных ситуациях: психологические консультации, тренинги и образовательные программы, чтобы своевременно предотвратить отказ от ребёнка и сохранить семью.',
        slug: 'prevention'
    },
    {
        title: 'Адвокация',
        description:
            'Лоббирование и продвижение изменений в законодательстве, общественные кампании и просветительские мероприятия для защиты прав детей и повышения ответственности общества.',
        slug: 'advocacy'
    },
    {
        title: 'Гуманитарная помощь',
        description:
            'Экстренная поддержка в чрезвычайных ситуациях: доставка продуктовых наборов, медикаментов, организация временного приюта и восстановительных лагерей.',
        slug: 'humanitarian-aid'
    },
    {
        title: 'Психическое здоровье',
        description:
            'Программы арт- и игрового терапий, группы поддержки и индивидуальные консультации для детей и подростков, переживших травматические события.',
        slug: 'mental-health'
    }
]

const Blocks = () => {
    const { metrics, loading, error, fetchMetrics } = useMetricsStore();

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!metrics.length) return <p>No data available</p>;

    return (
        <div className={s.container}>
            {data.map((item, i) => (
                <ul key={i}>
                    <li>
                        <span>
                            <Image
                                src={`/image/program/program-${i + 1}.jpg`}
                                alt="item"
                                fill
                                objectFit="cover"
                                blurDataURL={`/image/fond/background-${i + 2}.jpg`}
                            />
                        </span>
                        <div className={s.item}>
                            <Image
                                src={`/icons/program/content-${i + 1}.svg`}
                                alt="icon"
                                width={36}
                                height={36}
                            />
                            <p>{item.title}</p>
                        </div>
                    </li>
                    <p className={s.description}>{item.description}</p>
                    <Link href={`/programs/${item.slug}`}>
                        <Button className={s.btn}>Узнать больше</Button>
                    </Link>
                </ul>
            ))}
        </div>
    )
}

export default Blocks