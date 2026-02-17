import React from 'react'
import styles from './HeaderSection.module.scss'
// import EyeIco from '../../../../assets/icons/headerEye.svg'
import SearchIco from '../../../../assets/icons/search.svg'
import { useTranslations } from 'next-intl'
import { useAuthStore } from '@/store/useAuthStore'
import ProfileIco from '@/assets/icons/profile.svg'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher/LanguageSwitcher'

const HeaderSection = () => {
    const t = useTranslations()
    // const [checked, setChecked] = useState(false)
    const { isAuthenticated } = useAuthStore()

    return (
        <div className={styles.headerSection}>
            <Link href="/search">
                <SearchIco className={styles.searchIcon} />

            </Link>
            <div className={styles.language}>
                <LanguageSwitcher isMobile={false} />
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
            {isAuthenticated ? <Link href={'/profile'}> <ProfileIco /> </Link> : <Link href="/login">
                <button className={`${styles.btn} ${styles.login}`}>{t('login')}</button>
            </Link>}

        </div>
    )
}

export default HeaderSection
