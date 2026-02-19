import React from 'react'
import s from './FirstModal.module.scss'
import Image from 'next/image'
import Button from '@/shared/ui/Button/Button'
import {Link} from '@/i18n/navigation'
import {useParams} from 'next/navigation'

interface FirstModalProps {
    onClose: () => void
}

const content = {
    ru: {
        title: 'Каждый ребёнок достоин семьи',
        subtitle: 'Станьте опорой для малыша',
        btn: 'Присоединиться к кампании',
        close: 'Закрыть'
    },
    en: {
        title: 'Every child deserves a family',
        subtitle: 'Become a support for a child',
        btn: 'Join the campaign',
        close: 'Close'
    },
    ky: {
        title: 'Ар бир бала үй-бүлөгө татыктуу',
        subtitle: 'Балага таяныч болуңуз',
        btn: 'Кампанияга кошулуу',
        close: 'Жабуу'
    }
}

const FirstModal = ({onClose}: FirstModalProps) => {
    const {locale} = useParams<{ locale: string }>()
    const t = content[locale as keyof typeof content] ?? content.ru

    return (
        <div className={s.overlay} onClick={onClose}>
            <section className={s.container} onClick={e => e.stopPropagation()}>
                <div className={s.image}>
                    <Image
                        src={`/image/modal/firstModal.jpg`}
                        alt="item"
                        fill
                        objectFit="cover"
                    />
                </div>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
                <Link href={'/chronicles'} className={s.link}>
                    <Button className={s.btn}>{t.btn}</Button>
                </Link>
                <span onClick={onClose}>{t.close}</span>
            </section>
        </div>
    )
}

export default FirstModal