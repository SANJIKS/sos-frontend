import React from 'react'
import {useTranslations} from 'next-intl'
import s from './Stages.module.scss'
import {Payment} from '@/shared/types/payment'
import ProgressBar from '@/shared/ui/PaymentForms/ProgressBar/ProgressBar'

interface StagesProps {
    payment: Payment
    setPayment: (payment: Payment) => void
    handleSumClick: (sum: number) => void
    handleTypeChange: (type: 'one_time' | 'monthly' | 'yearly') => void
    globalStages: number
    setGlobalStages: (globalStages: number) => void
    loading: boolean
    onClose: () => void
}

const Stages = ({
                    payment,
                    setPayment,
                    handleSumClick,
                    handleTypeChange,
                    globalStages,
                    setGlobalStages,
                    onClose
                }: StagesProps) => {
    const t = useTranslations('payment.stages1')
    const summs = [500, 1000, 2000, 5000]

    const DONATION_TYPES: { label: string; value: 'one_time' | 'monthly' | 'yearly' }[] = [
        {label: 'Разово', value: 'one_time'},
        {label: 'Ежемесячно', value: 'monthly'},
        {label: 'Ежегодно', value: 'yearly'}
    ]

    React.useEffect(() => {
        if (!payment.type) {
            setPayment({...payment, type: 'one_time'})
        }
    }, [payment, setPayment])

    const handleDonationTypeSelect = (value: 'one_time' | 'monthly' | 'yearly') => {
        if (payment.type === value) return
        handleTypeChange(value)
    }

    const handleNextStage = async () => {
        if (globalStages === 1 && payment.sum) {
            setGlobalStages(2)
        }
    }

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.stages} onClick={(e) => e.stopPropagation()}>
                <div className={s.typesWrapper}>
                    {DONATION_TYPES.map(({label, value}) => (
                        <button
                            key={value}
                            className={`${s.types} ${payment.type === value ? s.activeTypes : ''}`}
                            onClick={() => handleDonationTypeSelect(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <input className={s.input} type="number" min={0} placeholder={t('placeholder')}
                       value={payment.sum || ''}
                       onChange={(e) => setPayment({...payment, sum: Number(e.target.value)})}/>
                <ul>
                    {
                        summs.map((sum) => (
                            <li key={sum} className={payment.sum === sum ? s.active : ''}
                                onClick={() => handleSumClick(sum)}>{sum}c</li>
                        ))
                    }
                </ul>

                <ProgressBar currentStage={globalStages}/>

                <button
                    className={`${s.btn} ${globalStages === 2 ? s.loading : ''}`}
                    onClick={handleNextStage}
                    disabled={globalStages === 3}
                >
                    Продолжить
                </button>
            </div>
        </div>
    )
}

export default Stages