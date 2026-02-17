import React from 'react'
import { useTranslations } from 'next-intl'
import s from './Form.module.scss'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

const Form = () => {
  const t = useTranslations('form')
  
  return (
        <div className={s.form}>
            <Image src='/image/donate/form-image.png' alt='form' fill objectFit='cover' />
            <div className={s.title}>
                <h3>{t('title')}</h3>
                <p>{t('description')}</p>
                <Link href={'/contacts'} className={s.button}>
                    <button>{t('button')}</button>
                </Link>
            </div>
        </div>
  )
}

export default Form