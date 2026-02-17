'use client'
import React, {useState} from 'react'
import {useTranslations} from 'next-intl'
import s from './Payment.module.scss'
import {usePament} from './hooks/usePament'
import {Stages, Stages2} from './module'
import ProgressBar from '@/appLayer/DonatePage/module/Payment/module/ProgressBar/ProgressBar'
import Image from 'next/image'
import {toast} from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'
import {Link} from '@/i18n/navigation'


const Payment = () => {
    const {
        setStages,
        stages,
        payment,
        setPayment,
        handleSumClick,
        handleTypeChange,
        createPayment,
        loading,
        isAuthenticated,
        captchaToken,
        setCaptchaToken
    } = usePament()
    const t = useTranslations('payment')
    const paymentMethods = ['visa', 'elkart', 'master-card']
    const [check, setCheck] = useState(false)

    const stageConfig = {
        1: {
            title: t('stages.1.title'),
            subtitle: t('stages.1.subtitle'),
            buttonText: t('stages.1.buttonText'),
            component: <Stages payment={payment} setPayment={setPayment} handleSumClick={handleSumClick}
                               handleTypeChange={handleTypeChange}/>
        },
        2: {
            title: t('stages.2.title'),
            subtitle: t('stages.2.subtitle'),
            buttonText: t('stages.2.buttonText'),
            component: <Stages2 payment={payment} setPayment={setPayment} isAuthenticated={isAuthenticated}/>
        },
        3: {
            title: t('stages.3.title'),
            subtitle: t('stages.3.subtitle'),
            buttonText: t('stages.3.buttonText'),
            component: null
        }
    }

    const currentStageConfig = stageConfig[stages as keyof typeof stageConfig] || stageConfig[1]

    const handleNextStage = async () => {
        if (stages === 2) {
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

        if (!payment.type) {
            toast.error('Пожалуйста, выберите тип пожертвования')
            return
        }

        if (stages < 2 || (stages === 3 && loading)) {
            setStages(stages + 1)
        }
    }

    return (
        <section className={s.payment}>
            <div className={s.title}>
                <h2>{currentStageConfig.title}</h2>
                {currentStageConfig.subtitle && <p>{currentStageConfig.subtitle}</p>}
            </div>

            {
                currentStageConfig.component != null && <div className={s.form}>
                    {currentStageConfig.component}
                </div>
            }


            <ProgressBar currentStage={stages}/>

            {stages >= 2 && (
                <>
                    <div className={s.agreement}>
                        <input type="checkbox" id="agreement-checkbox" onClick={() => setCheck(!check)}
                               checked={check}/>
                        <label htmlFor="agreement-checkbox">
                            {t('agreement')} <Link href="/privacy-policy">{t('agreementLink1')}</Link> и <Link
                            href="/privacy-policy">{t('agreementLink2')}</Link>
                        </label>
                    </div>
                    <div className={s.captchaWrapper}>
                        {stages >= 2 && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={setCaptchaToken}
                            />
                        )}
                    </div>
                </>
            )}

            <button
                className={`${s.btn} ${stages === 3 ? s.loading : ''}`}
                onClick={handleNextStage}
                disabled={stages === 3}
            >
                {currentStageConfig.buttonText}
            </button>

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
        </section>
    )
}
//

export default Payment