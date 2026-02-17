'use client'

import React, {useState} from 'react'
import s from './LoginPage.module.scss'
import AuthBanner from '@/widget/Auth/AuthBanner'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import {Link, useRouter} from '@/i18n/navigation'
import EyeIco from '@/assets/icons/eyes.svg'
import {useAuthStore} from '@/store/useAuthStore'
import { toast } from 'react-hot-toast'
import {useTranslations} from 'next-intl'
import { getErrorMessage, isFieldErrors } from '@/shared/lib/errorHandler'

interface ILogin {
    email: string
    password: string
}

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState<ILogin>({
        email: '',
        password: ''
    })

    const { login, loading, error } = useAuthStore()
    const router = useRouter()
    const t = useTranslations('auth.login')
    const tMessages = useTranslations('auth.messages')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await login(form)
        if (res?.success) {
            toast.success(tMessages('loginSuccess'))
            router.push('/')
        } else {
            if (error) {
                const errorMsg = isFieldErrors(error) 
                    ? (error.detail?.[0] || error.general?.[0] || getErrorMessage(error))
                    : getErrorMessage(error);
                toast.error(errorMsg);
            }
        }
    }

    return (
        <section className={s.loginPage}>
            <AuthBanner className={s.authBanner}/>
            <div className={s.loginPageRight}>
                <h2>{t('title')}</h2>
                <form className={s.loginPageForm} onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        className={s.loginPageFormFormInput}
                        placeholder={t('email.placeholder')}
                        label={t('email.label')}
                        value={form.email}
                        onChange={handleChange}
                        error={!!error}
                        errorMessage={error?.email?.[0] || ''}
                    />
                    <div className={s.loginPageFormFormPassword}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className={s.loginPageFormFormInput}
                            placeholder={t('password.placeholder')}
                            label={t('password.label')}
                            iconRight={<EyeIco/>}
                            onClickRightIcon={() => setShowPassword((prev) => !prev)}
                            value={form.password}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.password?.[0] || ''}
                        />
                        <Link href={'/forgot-password'} className={s.forgotP}>{t('forgotPassword')}</Link>
                    </div>
                    <Button type="submit" theme={'blue'} className={s.loginPageFormFormButton}>
                        {loading ? t('submitButtonLoading') : t('submitButton')}
                    </Button>
                    <span>{t('agreement')} <Link
                        href="/" className={s.police}>{t('privacyPolicy')}</Link> и <Link
                        href="/" className={s.police}>{t('userAgreement')}</Link> </span>
                </form>

                <p className={s.account}> {t('noAccount')} <Link
                    href="/register" className={s.linkedAccount}>{t('registerLink')}</Link></p>
            </div>
        </section>
    )
}

export default LoginPage