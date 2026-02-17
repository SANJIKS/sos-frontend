'use client'
import React from 'react'
import {useTranslations} from 'next-intl'
import s from './DonationForm.module.scss'
import Image from 'next/image'
import cn from 'classnames'
import {usePament} from '@/appLayer/DonatePage/module/Payment/hooks/usePament'
import Stages2 from '@/shared/ui/PaymentForms/Stages2/Stages2'

const DonationForm = () => {
    const t = useTranslations('donationForm')
    const paymentMethods = ['elkart', 'master-card', 'visa']
    const tariffs = t.raw('tariffs') as string[]
    const [activeTariff, setActiveTariff] = React.useState<number | null>(null)

    const {
        payment,
        setPayment,
        globalStages,
        setGlobalStages,
        handleSumClick,
        createPayment,
        loading,
        isAuthenticated,
        setCaptchaToken,
        captchaToken,
        handleTypeChange
    } = usePament()

    const handleInputDonate = () => {
        if (payment.sum && payment.sum > 0) {
            setPayment({...payment, type: 'monthly'})
            setGlobalStages(2)
        }
    }
    const getDynamicContent = () => {
        let selectedAmount = '200'

        if (activeTariff !== null) {
            selectedAmount = tariffs[activeTariff]
        } else if (payment.sum) {
            const amount = payment.sum
            if (amount <= 350) {
                selectedAmount = '200'
            } else if (amount <= 750) {
                selectedAmount = '500'
            } else if (amount <= 1500) {
                selectedAmount = '1000'
            } else {
                selectedAmount = '2000'
            }
        }

        const dynamicTexts = t.raw('dynamicTexts') as any
        const texts = dynamicTexts[selectedAmount] || dynamicTexts['200']

        // Определяем иконки для каждого тарифа
        const icons = {
            '200': {
                left: '/icons/donate/icons/payment-methods/choice-left.svg',
                right: '/icons/donate/icons/payment-methods/choice-right.svg'
            },
            '500': {
                left: '/icons/donate/icons/payment-methods/movie-ticket.svg',
                right: '/icons/donate/icons/payment-methods/grocery-set-for-a-week.svg'
            },
            '1000': {
                left: '/icons/donate/icons/payment-methods/a-set-of-school-supplies.svg',
                right: '/icons/donate/icons/payment-methods/complete-set-of-technical-materials.svg'
            },
            '2000': {
                left: '/icons/donate/icons/payment-methods/family-dinner-at-a-cafe.svg',
                right: '/icons/donate/icons/payment-methods/a-month-of-classes-in-a-developmental-club.svg'
            }
        }

        return {
            texts,
            icons: icons[selectedAmount as keyof typeof icons] || icons['200']
        }
    }

    const dynamicContent = getDynamicContent()

    return (
        <div className={s.donationForm}>
            <h3 className={s.titleForm}>
                {t('title')}
            </h3>
            <div className={s.margin}>
                <div className={s.pading}>
                    <div className={s.form}>
                        <div className={s.title}>
                            <h3>{t('subscription.title')}</h3>
                            <p>{t('subscription.description')}</p>
                        </div>
                        <div className={s.inputs}>
                            <input
                                type="number"
                                value={payment.sum || ''}
                                placeholder={t('subscription.placeholder')}
                                onChange={(e) => {
                                    setPayment({...payment, sum: Number(e.target.value), type: 'monthly'})
                                    setActiveTariff(null)
                                }}/>
                            <ul>
                                {tariffs.map((tariff, index) => (
                                    <li
                                        key={index}
                                        className={cn({[s.activeTariff]: activeTariff === index})}
                                        onClick={() => {
                                            handleTypeChange('monthly')
                                            setActiveTariff(index)
                                            handleSumClick(Number(tariff))
                                        }}
                                    >
                                        {tariff} с
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={s.choice}>
                            <div className={s.left}>
                                <h3>{dynamicContent.texts.left.title}</h3>
                                <div>
                                    <span>
                                        <Image src={dynamicContent.icons.left} alt="choice"
                                               width={36} height={36}/>
                                    </span>
                                    <p>{dynamicContent.texts.left.description}</p>
                                </div>
                            </div>
                            <div className={s.right}>
                                <h3>{dynamicContent.texts.right.title}</h3>
                                <div>
                                    <span>
                                        <Image src={dynamicContent.icons.right}
                                               alt="choice" width={36} height={36}/>
                                    </span>
                                    <p>{dynamicContent.texts.right.description} </p>
                                </div>
                            </div>
                        </div>
                        <button className={s.btn} onClick={handleInputDonate}>{t('subscription.button')}</button>
                        <ul className={s.paymentMethods}>
                            {paymentMethods.map((method) => (
                                <li key={method} className={s[method]}>
                                    <Image src={`/icons/donate/icons/payment-methods/${method}.svg`} alt={method}
                                           width={70} height={70}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {globalStages === 2 && (
                <Stages2
                    payment={payment} setPayment={setPayment} isAuthenticated={isAuthenticated}
                    globalStages={globalStages} setGlobalStages={setGlobalStages} loading={loading}
                    createPayment={createPayment}
                    onClose={() => setGlobalStages(1)} setCaptchaToken={setCaptchaToken} captchaToken={captchaToken}
                    // isSubcribe={true}
                />
            )}

        </div>
    )
}

export default DonationForm