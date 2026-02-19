import React from 'react'
import {useTranslations} from 'next-intl'
import s from './Stages.module.scss'
import {Payment} from '../../type'

interface StagesProps {
    payment: Payment
    setPayment: (payment: Payment) => void
    handleSumClick: (sum: number) => void
    handleTypeChange: (type: 'monthly' | 'yearly') => void
}

const Stages = ({payment, setPayment, handleSumClick, handleTypeChange}: StagesProps) => {
    const t = useTranslations('payment.stages1')
    const summs = [500, 1000, 2000, 5000]
    return (
        <div className={s.stages}>
            <input className={s.input} type="number" min={0} placeholder={t('placeholder')} value={payment.sum || ''}
                   onChange={(e) => setPayment({...payment, sum: Number(e.target.value)})}/>
            <ul>
                {
                    summs.map((sum) => (
                        <li key={sum} className={payment.sum === sum ? s.active : ''}
                            onClick={() => handleSumClick(sum)}>{sum}c</li>
                    ))
                }
            </ul>
            <div className={s.tariff}>
                <div className={s.radioWrapper}>
                    <input
                        type="radio"
                        name="type"
                        id="type1"
                        className={s.radio}

                        checked={payment.type === 'monthly'}
                        onChange={() => handleTypeChange('monthly')}
                    />
                    <label htmlFor="tariff1" className={s.radioTitle}>{t('monthly')}</label>
                </div>
                <div className={s.radioWrapper}>
                    <input
                        type="radio"
                        name="type"
                        id="type2"
                        className={s.radio}
                        checked={payment.type === 'yearly'}
                        onChange={() => handleTypeChange('yearly')}
                    />
                    <label htmlFor="tariff2" className={s.radioTitle}>{t('yearly')}</label>
                </div>
            </div>
        </div>
    )
}

export default Stages 