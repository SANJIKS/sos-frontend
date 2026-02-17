'use client'

import React, {useState} from 'react'
import {useTranslations} from 'next-intl'
import s from './Stages2.module.scss'
import CustomInput from '@/shared/ui/CustomInput/CustomInput'
import {Payment} from '@/shared/types/payment'
import {toast} from 'react-hot-toast'
import ProgressBar from '@/shared/ui/PaymentForms/ProgressBar/ProgressBar'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'
import {useRouter} from 'next/navigation'

interface Stages2Props {
    payment: Payment
    setPayment: (payment: Payment) => void
    isAuthenticated: boolean
    globalStages: number
    setGlobalStages: (globalStages: number) => void
    loading: boolean
    createPayment: () => Promise<void>
    onClose: () => void
    closeMenu?: () => void
    setCaptchaToken: (token: string | null) => void
    captchaToken: string | null
}

const Stages2: React.FC<Stages2Props> = (props) => {
    const {
        payment,
        setPayment,
        isAuthenticated,
        globalStages,
        setGlobalStages,
        createPayment,
        loading,
        onClose,
        setCaptchaToken,
        captchaToken,
        closeMenu
    } = props

    const t = useTranslations('payment.stages2.fields')
    const tGlobal = useTranslations('payment')
    const router = useRouter()
    const [check, setCheck] = useState(false)
    const paymentMethods = ['visa', 'elkart', 'master-card']

    const updateUser = (field: keyof Payment['user'], value: string) => {
        setPayment({
            ...payment,
            user: {...payment.user, [field]: value}
        })
    }

    const handleNextStage = async () => {
        // Проверка на пустые поля
        const emptyField = Object.entries(payment.user).find(([key, value]) => !value.trim())
        if (emptyField) {
            toast.error(`Please fill in your ${emptyField[0]}!`)
            return
        }

        if (globalStages === 2) {
            if (!check) {
                toast.error('You need to agree to the terms and conditions!')
                return
            }

            if (!captchaToken) {
                toast.error('Please verify that you are not a robot!')
                return
            }

            await createPayment()
        }

        if (globalStages < 2 || (globalStages === 3 && loading)) {
            setGlobalStages(globalStages + 1)
        }
    }

    const handleLink = () => {
        onClose()
        if (closeMenu) {
            closeMenu()
        }
        router.push('/privacy-policy')
    }

    const fields = [
        {key: 'name' as const, label: t('name.label'), placeholder: t('name.placeholder'), type: 'text'},
        {key: 'surname' as const, label: t('surname.label'), placeholder: t('surname.placeholder'), type: 'text'},
        {key: 'phone' as const, label: t('phone.label'), placeholder: t('phone.placeholder'), type: 'tel'},
        {key: 'email' as const, label: t('email.label'), placeholder: t('email.placeholder'), type: 'email'}
    ]

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.container} onClick={(e) => e.stopPropagation()}>
                <div className={s.title}>
                    <h2>{tGlobal('stages.2.title')}</h2>
                </div>

                <div className={s.stages2}>
                    {fields.map(field => (
                        <CustomInput
                            key={field.key}
                            type={field.type}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={payment.user[field.key]}
                            onChange={(e) => updateUser(field.key, e.target.value)}
                            disabled={isAuthenticated}
                            required={true}
                        />
                    ))}
                </div>

                <ProgressBar currentStage={globalStages}/>

                <button
                    className={`${s.btn} ${globalStages === 3 ? s.loading : ''}`}
                    onClick={handleNextStage}
                    disabled={globalStages === 3}
                >
                    {tGlobal('stages.1.buttonText')}
                </button>

                <div className={s.agreement}>
                    <input type="checkbox" id="agreement-checkbox" onClick={() => setCheck(!check)} checked={check}/>
                    <label htmlFor="agreement-checkbox">
                        {tGlobal('agreement ' )}
                        <span className={s.privacy} onClick={handleLink}>{tGlobal('agreementLink1 ')}</span>
                        и
                        <span className={s.privacy}
                              onClick={handleLink}>{tGlobal('agreementLink2')}
                        </span>
                    </label>
                </div>

                <div className={s.captchaWrapper}>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={setCaptchaToken}
                    />
                </div>

                <div className={s.paymentMethodsWrapper}>
                    <ul className={s.paymentMethods}>
                        {paymentMethods.map((method) => (
                            <li key={method}>
                                <Image src={`/icons/donate/icons/payment-methods/${method}.svg`} alt={method} width={70}
                                       height={40} style={{objectFit: 'contain'}}/>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Stages2