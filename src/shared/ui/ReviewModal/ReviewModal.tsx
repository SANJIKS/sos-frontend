'use client'

import React, { useState } from 'react'
import s from './ReviewModal.module.scss'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { useReviewStore } from '@/store/useReviewStore'
import { usePreventDoubleSubmit } from '@/shared/hooks/usePreventDoubleSubmit'

interface ReviewModalProps {
    isOpen: boolean
    onClose: () => void
}

const ReviewModal = ({ isOpen, onClose }: ReviewModalProps) => {
    const t = useTranslations('reviewModal')
    const {
        name,
        last_name,
        email,
        message,
        photo,
        setField,
        setPhoto,
        setFieldError,
        sendReview,
        loading,
        error,
        success,
    } = useReviewStore()

    const [photoPreview, setPhotoPreview] = useState<string | null>(null)

    const handleClose = () => {
        setPhotoPreview(null)
        onClose()
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhoto(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const protectedSendReview = usePreventDoubleSubmit(sendReview, 2000);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedMessage = message.trim()
        
        if (trimmedMessage.length < 10) {
            setFieldError('message', [t('errors.messageMin')])
            return
        }

        try {
            await protectedSendReview()
        } catch (error) {
            // Ошибка уже обработана в store
        }
    }

    // Отслеживание успешной отправки
    React.useEffect(() => {
        if (success && !error) {
            toast.success(t('success'))
            handleClose()
        }
    }, [success, error, t])

    // Сброс превью при закрытии модалки
    React.useEffect(() => {
        if (!isOpen) {
            setPhotoPreview(null)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className={s.overlay} onClick={handleClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeButton} onClick={handleClose}>
                    ×
                </button>
                <h2 className={s.title}>{t('title')}</h2>
                
                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.field}>
                        <label htmlFor="firstName">
                            {t('firstName.label')}*
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder={t('firstName.placeholder')}
                            value={name}
                            onChange={(e) => setField('name', e.target.value)}
                            required
                        />
                        {error?.name && <span className={s.error}>{error.name[0]}</span>}
                    </div>

                    <div className={s.field}>
                        <label htmlFor="lastName">
                            {t('lastName.label')}*
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder={t('lastName.placeholder')}
                            value={last_name}
                            onChange={(e) => setField('last_name', e.target.value)}
                            required
                        />
                        {error?.last_name && <span className={s.error}>{error.last_name[0]}</span>}
                    </div>

                    <div className={s.field}>
                        <label htmlFor="email">
                            {t('email.label')}*
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder={t('email.placeholder')}
                            value={email}
                            onChange={(e) => setField('email', e.target.value)}
                            required
                        />
                        {error?.email && <span className={s.error}>{error.email[0]}</span>}
                    </div>

                    <div className={s.field}>
                        <label htmlFor="photo">
                            {t('photo.label')}
                        </label>
                        <div className={s.fileUpload}>
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="photo" className={s.fileButton}>
                                {photo ? (t('photo.fileSelected') || 'File selected') : t('photo.choose')}
                            </label>
                            {photoPreview && (
                                <div className={s.preview}>
                                    <img src={photoPreview} alt="Preview" />
                                </div>
                            )}
                        </div>
                        {error?.photo && <span className={s.error}>{error.photo[0]}</span>}
                    </div>

                    <div className={s.field}>
                        <label htmlFor="message">
                            {t('message.label')}*
                        </label>
                        <textarea
                            id="message"
                            placeholder={t('message.placeholder')}
                            value={message}
                            onChange={(e) => setField('message', e.target.value)}
                            required
                            rows={5}
                        />
                        {error?.message && <span className={s.error}>{error.message[0]}</span>}
                    </div>

                    <div className={s.checkbox}>
                        <input
                            id="privacy"
                            type="checkbox"
                            required
                        />
                        <label htmlFor="privacy">
                            {t('privacy.label')}{' '}
                            <a href="/child-protection-policy" className={s.link}>
                                {t('privacy.link')}
                            </a>
                        </label>
                    </div>

                    {error?.detail && <div className={s.generalError}>{error.detail[0]}</div>}

                    <button type="submit" className={s.submitButton} disabled={loading}>
                        {loading ? t('sending') : t('submit')}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ReviewModal

