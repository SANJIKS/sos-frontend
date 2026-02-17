import React from 'react'
import s from './FirstModal.module.scss'
import Image from 'next/image'
import Button from '@/shared/ui/Button/Button'
import {Link} from '@/i18n/navigation'

interface FirstModalProps {
    onClose: () => void
}

const FirstModal = ({ onClose }: FirstModalProps) => {
    return (
        <section className={s.container}>
            <div className={s.image}>
                <Image
                    src={`/image/modal/firstModal.jpg`}
                    alt="item"
                    fill
                    objectFit="cover"
                    blurDataURL={`/image/modal/firstModal.jpg`}
                />
            </div>
            <h1>Каждый ребёнок достоин семьи</h1>
            <p>Станьте опорой для малыша</p>
            <Link href={'/chronicles'} className={s.link}>
                <Button className={s.btn}>Происоеденится к компании</Button>
            </Link>
            <span onClick={onClose}>Закрыть</span>
        </section>
    )
}

export default FirstModal