'use client'

import React, {useState} from 'react'
import s from './RegisterPage.module.scss'
import AuthBanner from '@/widget/Auth/AuthBanner'
import Input from '@/shared/ui/Input/Input'
import EyeIco from '@/assets/icons/eyes.svg'
import Button from '@/shared/ui/Button/Button'
import {Link, useRouter} from '@/i18n/navigation'
import {useAuthStore, } from '@/store/useAuthStore'
// import {notify} from '@/shared/lib/notification'
import { toast } from 'react-hot-toast'
import {useTranslations} from 'next-intl'


interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_confirm: string;
}

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [form, setForm] = useState<IRegister>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirm: '',
    });
    const router = useRouter()
    const t = useTranslations('auth.register')
    const tMessages = useTranslations('auth.messages')

    const { loading, error, register } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await register({
            email: form.email,
            last_name: form.last_name,
            first_name: form.first_name,
            phone: form.phone,
            password: form.password,
            consent_data_processing: true,
            password_confirm: form.password_confirm,
        });
        if (res?.success) {
            toast.success(tMessages('registrationSuccess'))
            router.push('/code-check')
        }
    };

    return (
        <section className={s.registerPage}>
            <AuthBanner className={s.authBanner} />
            <div className={s.registerPageRight}>
                <h2>{t('title')}</h2>
                <form className={s.registerPageForm} onSubmit={handleSubmit}>
                    <div className={s.inputContainer}>
                        <Input
                            type="text"
                            name="first_name"
                            className={s.registerPageFormFormInput}
                            placeholder={t('firstName.placeholder')}
                            label={t('firstName.label')}
                            value={form.first_name}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.first_name?.[0] || ''}
                        />
                        <Input
                            type="text"
                            name="last_name"
                            className={s.registerPageFormFormInput}
                            placeholder={t('lastName.placeholder')}
                            label={t('lastName.label')}
                            value={form.last_name}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.last_name?.[0] || ''}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <Input
                            type="email"
                            name="email"
                            className={s.registerPageFormFormInput}
                            placeholder={t('email.placeholder')}
                            label={t('email.label')}
                            value={form.email}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.email?.[0] || ''}
                        />
                        <Input
                            type="text"
                            name="phone"
                            className={s.registerPageFormFormInput}
                            placeholder={t('phone.placeholder')}
                            label={t('phone.label')}
                            value={form.phone}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.phone?.[0] || ''}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className={s.registerPageFormFormInput}
                            placeholder={t('password.placeholder')}
                            label={t('password.label')}
                            iconRight={<EyeIco/>}
                            onClickRightIcon={() => setShowPassword((prev) => !prev)}
                            value={form.password}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.password?.[0] || ''}
                        />
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirm"
                            className={s.registerPageFormFormInput}
                            placeholder={t('confirmPassword.placeholder')}
                            label={t('confirmPassword.label')}
                            iconRight={<EyeIco/>}
                            onClickRightIcon={() => setShowConfirmPassword((prev) => !prev)}
                            value={form.password_confirm}
                            onChange={handleChange}
                            error={!!error}
                            errorMessage={error?.password_confirm?.[0] || ''}
                        />
                    </div>

                    <Button type="submit" theme={'blue'} className={s.registerPageFormFormButton}>
                        {loading ? t('submitButtonLoading') : t('submitButton')}
                    </Button>
                    <span>{t('agreement')} <Link
                        href="/" className={s.police}>{t('privacyPolicy')}</Link> и <Link
                        href="/" className={s.police}>{t('userAgreement')}</Link> </span>
                </form>

                <p className={s.account}> {t('hasAccount')} <Link
                    href="/login" className={s.linkedAccount}>{t('loginLink')}</Link></p>
            </div>
        </section>
    )
}

export default RegisterPage