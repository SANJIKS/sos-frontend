'use client'

import React, {useState} from 'react'
import s from './ForgotPassword.module.scss'
import AuthBanner from '@/widget/Auth/AuthBanner'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import {Link} from '@/i18n/navigation'
import {toast} from 'react-hot-toast'
import {useAuthStore} from '@/store/useAuthStore'
import {useTranslations} from 'next-intl'
import { getErrorMessage, isFieldErrors } from '@/shared/lib/errorHandler'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const {forgotPassword, error} = useAuthStore()
    const t = useTranslations('auth.forgotPassword')
    const tMessages = useTranslations('auth.messages')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await forgotPassword(email)
        if (res?.success) {
            toast.success(tMessages('passwordResetSent'))
            // router.push('/check-code')
        } else {
            if (error) {
                const errorMsg = isFieldErrors(error) && error.general?.[0] 
                    ? error.general[0] 
                    : getErrorMessage(error);
                toast.error(errorMsg || tMessages('error'));
            }
        }
    }

    return (
        <section className={s.forgotPassword}>
            <AuthBanner className={s.forgotBanner}/>
            <div className={s.forgotRight}>
                <h2>{t('title')}</h2>
                <form className={s.forgotForm} onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        className={s.forgotInput}
                        placeholder={t('email.placeholder')}
                        label={t('email.label')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        errorMessage={error?.email?.[0] || ''}
                    />

                    <Button type="submit" theme={'blue'} className={s.forgotButton}>
                        {t('submitButton')}
                    </Button>

                    <span>
            {t('rememberPassword')}{' '}
                        <Link href="/login" className={s.forgotLink}>
              {t('loginLink')}
            </Link>
                     </span>

                    <span>{t('agreement')} <Link
                        href="/" className={s.police}>{t('privacyPolicy')}</Link> и <Link
                        href="/" className={s.police}>{t('userAgreement')}</Link>
                    </span>
                </form>
            </div>
        </section>
    )
}

export default ForgotPasswordPage
