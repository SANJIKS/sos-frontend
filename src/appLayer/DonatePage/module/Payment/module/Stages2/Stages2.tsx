import React from 'react'
import {useTranslations} from 'next-intl'
import s from './Stages2.module.scss'
import CustomInput from '@/shared/ui/CustomInput/CustomInput'
import {Payment} from '../../type'

interface Stages2Props {
    payment: Payment
    setPayment: (payment: Payment) => void
    isAuthenticated : boolean
}

const Stages2: React.FC<Stages2Props> = ({ payment, setPayment, isAuthenticated }) => {
    const t = useTranslations('payment.stages2.fields')
    
    const updateUser = (field: keyof Payment['user'], value: string) => {
        setPayment({
            ...payment,
            user: { ...payment.user, [field]: value }
        })
    }
    const fields = [
        { key: 'name' as const, label: t('name.label'), placeholder: t('name.placeholder'), type: 'text' },
        { key: 'surname' as const, label: t('surname.label'), placeholder: t('surname.placeholder'), type: 'text' },
        { key: 'phone' as const, label: t('phone.label'), placeholder: t('phone.placeholder'), type: 'tel' },
        { key: 'email' as const, label: t('email.label'), placeholder: t('email.placeholder'), type: 'email' }
    ]

    return (
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
    )
}

export default Stages2