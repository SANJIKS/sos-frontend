import React from 'react'
import {Link} from '@/i18n/navigation'
import styles from './HeaderDown.module.scss'
import {useTranslations, useLocale} from 'next-intl'
import HeaderNavs from '../HeaderNavs/HeaderNavs'
import Button from '@/shared/ui/Button/Button'
import Stages from '@/shared/ui/PaymentForms/Stages/Stages'
import {usePament} from '@/appLayer/DonatePage/module/Payment/hooks/usePament'
import Stages2 from '@/shared/ui/PaymentForms/Stages2/Stages2'
import Image from 'next/image'

interface HeaderDownProps {
    className?: string;
}

const logoMap: Record<string, string> = {
    ru: '/icons/main/logo/logo-ru.svg',
    ky: '/icons/main/logo/logo-kg.svg',
    en: '/icons/main/logo/logo-en.svg',
}

const HeaderDown: React.FC<HeaderDownProps> = ({className}) => {
    const t = useTranslations()
    const locale = useLocale()
    const logoSrc = logoMap[locale] ?? logoMap['ru']

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
                <Image
                    src={logoSrc}
                    alt="SOS Children's Villages"
                    width={160}
                    height={60}
                    style={{ objectFit: 'contain' }}
                    priority
                />
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