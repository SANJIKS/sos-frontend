import React, {FC} from 'react'
import styles from './BurgerSection.module.scss'
// import EyeIco from '@/assets/icons/mobileEye.svg'
import {useTranslations} from 'next-intl'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher/LanguageSwitcher'
import {useRouter} from 'next/navigation'
import Stages from '@/shared/ui/PaymentForms/Stages/Stages'
import Stages2 from '@/shared/ui/PaymentForms/Stages2/Stages2'
import {usePament} from '@/appLayer/DonatePage/module/Payment/hooks/usePament'

interface MobileSocialProps {
    closeMenu: () => void;
}

const BurgerSection: FC<MobileSocialProps> = ( {closeMenu} ) => {
    const t = useTranslations()
    const router = useRouter()
    // const [checked, setChecked] = useState(false)
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

    const handleSubmit = () => {
        setGlobalStages(1)
        // closeMenu()
    };

    return (
        <div className={styles.headerSection}>
            <div className={styles.sectionleft}>
                <div className={styles.language}>
                    <LanguageSwitcher isMobile={true}/>
                </div>
                {/*<div className={styles.theme}>*/}
                {/*    <EyeIco className={styles.eyeIcon}/>*/}
                {/*    <label className={styles.switch}>*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            checked={checked}*/}
                {/*            onChange={() => setChecked(!checked)}*/}
                {/*        />*/}
                {/*        <span className={styles.slider}></span>*/}
                {/*    </label>*/}
                {/*</div>*/}
            </div>
                <button className={`${styles.btn} ${styles.login}`} onClick={handleSubmit} >{t('donate')}</button>

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
                    closeMenu={closeMenu}
                />
            )}
        </div>
    )
}

export default BurgerSection