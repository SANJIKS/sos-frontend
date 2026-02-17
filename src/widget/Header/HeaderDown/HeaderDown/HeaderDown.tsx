import React from 'react'
import {Link} from '@/i18n/navigation'
import styles from './HeaderDown.module.scss'
import MainIco from '../../../../assets/icons/mainIcon.svg'
import {useTranslations} from 'next-intl'
import HeaderNavs from '../HeaderNavs/HeaderNavs'
import Button from '@/shared/ui/Button/Button'
import Stages from '@/shared/ui/PaymentForms/Stages/Stages'
import {usePament} from '@/appLayer/DonatePage/module/Payment/hooks/usePament'
import Stages2 from '@/shared/ui/PaymentForms/Stages2/Stages2'

interface HeaderDownProps {
    className?: string;
}

const HeaderDown: React.FC<HeaderDownProps> = ({className}) => {
    const t = useTranslations()
    const {
        payment,
        setPayment,
        globalStages,
        setGlobalStages,
        handleSumClick,
        loading,
        handleTypeChange,
        isAuthenticated,
        createPayment,
        captchaToken,
        setCaptchaToken
    } = usePament()

    return (
        <div className={`${styles.headerDown} ${className ?? ''}`}>
            <Link href="/" className={styles.logo}>
                <MainIco className={styles.mainIcon}/>
                <label className={styles.logoText}>
                    <span className={styles.bold}>{t('logoFirst')}</span>
                    <span className={styles.bold}>{t('logoSecond')}</span>
                    <span className={styles.bright}>{t('country')}</span>
                </label>
            </Link>
            <HeaderNavs/>
            <Button className={styles.btn} theme="red" onClick={() => setGlobalStages(1)}>
                {t('donate')}
            </Button>

            {globalStages === 1 && (
                <Stages
                    payment={payment} setPayment={setPayment}
                    globalStages={globalStages} setGlobalStages={setGlobalStages} loading={loading}
                    onClose={() => setGlobalStages(0)} handleSumClick={handleSumClick}
                    handleTypeChange={handleTypeChange}
                />
            )}

            {globalStages === 2 && (
                <Stages2
                    payment={payment} setPayment={setPayment} isAuthenticated={isAuthenticated}
                    globalStages={globalStages} setGlobalStages={setGlobalStages} loading={loading}
                    createPayment={createPayment}
                    onClose={() => setGlobalStages(0)} setCaptchaToken={setCaptchaToken} captchaToken={captchaToken}
                />
            )}
        </div>
    )
}

export default HeaderDown
