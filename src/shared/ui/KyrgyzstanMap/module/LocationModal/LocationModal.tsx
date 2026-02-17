    import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import s from './LocationModal.module.scss'
import Image from 'next/image'

interface ApiLocation {
    point_id: string
    name: string
    name_kg: string
    name_en: string
    description: string
    description_kg: string
    description_en: string
    image_url: string
    x_percent: string
    y_percent: string
    id: number
    
    x: number
    y: number
    image: string
}

const LocationModal = ({ location, onClose }: { location: ApiLocation; onClose: () => void }) => {
    const t = useTranslations('locationModal')
    const locale = useLocale()
    
    // Функция для получения локализованного названия
    const getLocalizedName = () => {
        switch (locale) {
            case 'ky':
                return location.name_kg || location.name
            case 'en':
                return location.name_en || location.name
            default:
                return location.name
        }
    }
    
    // Функция для получения локализованного описания
    const getLocalizedDescription = () => {
        switch (locale) {
            case 'ky':
                return location.description_kg || location.description
            case 'en':
                return location.description_en || location.description
            default:
                return location.description
        }
    }
    
    
    return (
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.image}>
                <Image src={location.image} alt={'location image'} loading='lazy' fill objectFit='cover' />
            </div>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{getLocalizedName()}</h2>
                <p>{getLocalizedDescription()}</p>
                <button onClick={onClose}>{t('closeButton')}</button>
            </div>
        </div>
    )
}
export default LocationModal