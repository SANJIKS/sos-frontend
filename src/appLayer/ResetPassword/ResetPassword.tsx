'use client'

import React, {useEffect, useState} from 'react'
import s from './ResetPassword.module.scss'
import AuthBanner from '@/widget/Auth/AuthBanner'
import Input from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button/Button'
import {useRouter} from '@/i18n/navigation'
import {useAuthStore} from '@/store/useAuthStore'
import {useSearchParams} from 'next/navigation'
import EyeIco from '@/assets/icons/eyes.svg'
import {toast} from 'react-hot-toast'
import { getErrorMessage, isFieldErrors } from '@/shared/lib/errorHandler'

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [form, setForm] = useState({
        token: '',
        new_password: '',
        confirm_password: ''
    })
    const { resetPassword, error } = useAuthStore()

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token')
        if (tokenFromUrl) {
            setForm((prev) => ({ ...prev, token: tokenFromUrl }))
        }
    }, [searchParams])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await resetPassword(form)
        if (res?.success) {
            toast.success('Пароль успешно изменён!',)
            router.push('/login')
        } else {
            if (error) {
                const errorMsg = isFieldErrors(error) && error.general?.[0] 
                    ? error.general[0] 
                    : getErrorMessage(error);
                toast.error(errorMsg || 'Что-то пошло не так. Попробуйте ещё раз.');
            }
        }
    }

    return (
        <section className={s.forgotPassword}>
            <AuthBanner className={s.forgotBanner}/>
            <div className={s.forgotRight}>
                <h2>Придумайте новый пароль </h2>
                <form className={s.forgotForm} onSubmit={handleSubmit}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="new_password"
                        className={s.forgotInput}
                        placeholder="Придумайте новый пароль"
                        label="Придумайте новый пароль"
                        value={form.new_password}
                        onChange={ handleChange }
                        iconRight={<EyeIco/>}
                        onClickRightIcon={() => setShowPassword((prev) => !prev)}
                        error={!!error}
                        errorMessage={error?.new_password?.[0] || ''}
                    />
                    <Input
                        type={showPassword2 ? 'text' : 'password'}
                        name="confirm_password"
                        className={s.forgotInput}
                        placeholder="Подтвердите новый пароль"
                        label="Подтвердите новый пароль"
                        value={form.confirm_password}
                        onChange={ handleChange }
                        iconRight={<EyeIco/>}
                        onClickRightIcon={() => setShowPassword2((prev) => !prev)}
                        error={!!error}
                        errorMessage={error?.confirm_password?.[0] || ''}
                    />

                    <Button type="submit" theme={'blue'} className={s.forgotButton}>
                        Подтвердить
                    </Button>

                    {/*<span>Продолжая пользоваться сервисом, вы соглашаетесь с <Link*/}
                    {/*    href="/" className={s.police}>политикой конфиденциальности</Link> и <Link*/}
                    {/*    href="/" className={s.police}>пользовательским соглашением.</Link>*/}
                    {/*</span>*/}
                </form>
            </div>
        </section>
    )
}

export default ResetPassword
