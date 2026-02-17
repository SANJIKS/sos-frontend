'use client'

import React from 'react'
import styles from './Donation.module.scss'
import Button from '../Button/Button'
import {usePament} from '@/appLayer/DonatePage/module/Payment/hooks/usePament'
import Stages2 from '@/shared/ui/PaymentForms/Stages2/Stages2'
// import Stages3 from '@/shared/ui/PaymentForms/Stages3/Stages3'


const Donation = () => {
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

    const sums = [200, 400, 800]

    const handleInputDonate = () => {
        if (payment.sum && payment.sum > 0) {
            setGlobalStages(2)
            handleTypeChange('monthly')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.donation}>
                <div className={styles.donationPrice}>
                    {sums.map((sum) => (
                        <button
                            key={sum}
                            className={styles.donateBtn}
                            onClick={() => handleSumClick(sum)}
                        >
                            {sum} C
                        </button>
                    ))}
                </div>
                <p className={styles.donationText}>или</p>
                <div className={styles.donationInput}>
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        className={styles.input}
                        value={payment.sum || ''}
                        onChange={(e) =>
                            setPayment({...payment, sum: Number(e.target.value), type: 'monthly'})
                        }/>
                    <Button className={styles.btn} onClick={handleInputDonate}>Пожертвовать</Button>
                </div>
            </div>

            {globalStages === 2 && (
                <Stages2
                    payment={payment} setPayment={setPayment} isAuthenticated={isAuthenticated}
                    globalStages={globalStages} setGlobalStages={setGlobalStages} loading={loading} createPayment={createPayment}
                    onClose={() => setGlobalStages(1)} setCaptchaToken={setCaptchaToken} captchaToken={captchaToken}
                />
            )}

            {/*{stages === 3 && (*/}
            {/*    <Stages3*/}
            {/*        payment={payment}*/}
            {/*        onBack={() => setStages(2)}*/}
            {/*        onConfirm={createPayment}*/}
            {/*        loading={loading}*/}
            {/*        onClose={() => setStages(1)}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    )
}

export default Donation