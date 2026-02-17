"use client"
import React from 'react'
import s from './FeedbackForm.module.scss'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { useFeedbackStore } from '@/store/useFeedbackStore'
import { usePreventDoubleSubmit } from '@/shared/hooks/usePreventDoubleSubmit'

interface type {
  title: string
  description: string
}

const FeedbackForm = ({ title, description }: type) => {
  const t = useTranslations('contacts.feedbackForm')
  const {
    full_name,
    email,
    message,
    setField,
    setFieldError,
    sendFeedback,
    loading,
    error, 
  } = useFeedbackStore()

  const protectedSendFeedback = usePreventDoubleSubmit(sendFeedback, 2000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed.length < 10) {
      setFieldError('message', [t('errors.messageMin')])
      return
    }
    try {
      await protectedSendFeedback()
      toast.success(t('success'))
    } catch (error) {
      // Ошибка уже обработана в store
    }
  }

  return (
    <div className={s.form}>
      <div className={s.title}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={s.left}>
          <label htmlFor="name">
            <p>{t('name.label')}</p>
            <input
              id="name"
              type="text"
              placeholder={t('name.placeholder')}
              value={full_name}
              onChange={(e) => setField('full_name', e.target.value)}
            />
            {error?.full_name && <span className={s.error}>{error.full_name[0]}</span>}
          </label>

          <label htmlFor="email">
            <p>{t('email.label')}</p>
            <input
              id="email"
              type="email"
              placeholder={t('email.placeholder')}
              value={email}
              onChange={(e) => setField('email', e.target.value)}
            />
            {error?.email && <span className={s.error}>{error.email[0]}</span>}
          </label>

          <button type="submit" disabled={loading}>
            {loading ? t('sending') : t('submit')}
          </button>
        </div>

        <div className={s.right}>
          <label htmlFor="message">
            <p>{t('message.label')}</p>
            <textarea
              id="message"
              placeholder={t('message.placeholder')}
              value={message}
              onChange={(e) => setField('message', e.target.value)}
            />
            
            {error?.message && <span className={s.error}>{error.message[0]}</span>}
          </label>
          
          <button type="submit" disabled={loading}>
            {loading ? t('sending') : t('submit')}
          </button>
        </div>
        
        {error?.detail && <div className={s.generalError}>{error.detail[0]}</div>}
      </form>
    </div>
  )
}

export default FeedbackForm