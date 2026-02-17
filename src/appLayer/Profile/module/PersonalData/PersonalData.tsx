import React from 'react'
import s from './PersonalData.module.scss'
import Input from '@/shared/ui/Input/Input'
import {useAuthStore} from '@/store/useAuthStore'
import {Link} from '@/i18n/navigation'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'

const PersonalData = () => {
    const {user, logout, isAuthenticated} = useAuthStore()

    const router = useRouter()
    const t = useTranslations('auth.profile')

    const handleClick = () => {
        logout()
        router.push('/')
    }
    return (
        <section className={s.personalData}>
            <div className={s.inputs}>
                <Input
                    type="text"
                    name="name"
                    className={s.loginPageFormFormInput}
                    placeholder={t('firstName')}
                    label={t('firstName')}
                    value={user?.first_name}
                    disabled={true}
                    // onChange={handleChange}
                />
                <Input
                    type="text"
                    name="surname"
                    className={s.loginPageFormFormInput}
                    placeholder={t('lastName')}
                    label={t('lastName')}
                    value={user?.last_name}
                    disabled={true}
                    // onChange={handleChange}
                />
            </div>
            <div className={s.inputs}>
                <Input
                    type="email"
                    name="email"
                    className={s.loginPageFormFormInput}
                    placeholder={t('email')}
                    label={t('email')}
                    value={user?.email}
                    disabled={true}
                    // onChange={handleChange}
                />
                <Input
                    type="text"
                    name="telephon"
                    className={s.loginPageFormFormInput}
                    placeholder={t('phone')}
                    label={t('phone')}
                    value={user?.phone}
                    disabled={true}
                    // onChange={handleChange}
                />
            </div>
            <div className={s.options}>
                <Link href={'profile/change-password'}><p>{t('changePassword')}</p></Link>
                <p onClick={handleClick}>{t('logout')}</p>
            </div>

        </section>
    )
}

export default PersonalData