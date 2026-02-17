'use client'

import React, {useState} from 'react'
import s from './ChangePassword.module.scss'
import Input from '@/shared/ui/Input/Input'
import EyeIco from '@/assets/icons/eyes.svg'
import Button from '@/shared/ui/Button/Button'
import { toast } from 'react-hot-toast'
import {useAuthStore} from '@/store/useAuthStore'
import {useRouter} from '@/i18n/navigation'
import {useTranslations} from 'next-intl'
import { getErrorMessage, isFieldErrors } from '@/shared/lib/errorHandler'

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)
    const {changePassword, error} = useAuthStore()
    const [form, setForm] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })
    const router = useRouter()
    const t = useTranslations('auth.changePassword')
    const tMessages = useTranslations('auth.messages')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await changePassword(form)
        if (res?.success) {
            toast.success(tMessages('passwordChanged'))
            router.push('/profile')
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
        <div className={s.container}>
            <h1>{t('title')}</h1>
            <form className={s.form} onSubmit={handleSubmit}>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name="old_password"
                    className={s.input}
                    placeholder={t('oldPassword.placeholder')}
                    label={t('oldPassword.label')}
                    iconRight={<EyeIco/>}
                    onClickRightIcon={() => setShowPassword((prev) => !prev)}
                    value={form.old_password}
                    onChange={handleChange}
                    error={!!error}
                    errorMessage={error?.old_password?.[0] || ''}
                />

                <Input
                    type={showPassword2 ? 'text' : 'password'}
                    name="new_password"
                    className={s.input}
                    placeholder={t('newPassword.placeholder')}
                    label={t('newPassword.label')}
                    iconRight={<EyeIco/>}
                    onClickRightIcon={() => setShowPassword2((prev) => !prev)}
                    value={form.new_password}
                    onChange={handleChange}
                    error={!!error}
                    errorMessage={error?.new_password?.[0] || ''}
                />

                <Input
                    type={showPassword3 ? 'text' : 'password'}
                    name="confirm_password"
                    className={s.input}
                    placeholder={t('confirmPassword.placeholder')}
                    label={t('confirmPassword.label')}
                    iconRight={<EyeIco/>}
                    onClickRightIcon={() => setShowPassword3((prev) => !prev)}
                    value={form.confirm_password}
                    onChange={handleChange}
                    error={!!error}
                    errorMessage={error?.confirm_password?.[0] || ''}
                />

                <Button type={'submit'}>
                    {t('submitButton')}
                </Button>
            </form>
        </div>
    )
}

export default ChangePassword