'use client'

import React, {useState} from 'react'
import {Link, useRouter} from '@/i18n/navigation'
import MainIco from '@/assets/icons/mobileHeader.svg'
import LoopIco from '@/assets/icons/mobileSearch.svg'
import {useTranslations} from 'next-intl'
import styles from './MobileHeader.module.scss'
import BurgerSection from '@/widget/MobileHeader/BurgerSection/BurgerSection'
import MobileSocial from '@/widget/MobileHeader/MobileSocial/MobileSocial'
import MobileNavs from '@/widget/MobileHeader/MobileNavs/MobileNavs'
import Button from '@/shared/ui/Button/Button'
import {useAuthStore} from '@/store/useAuthStore'

const MobileHeader = () => {
    const t = useTranslations()
    const [menuOpen, setMenuOpen] = useState(false)
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const handleMenuClick = () => {
        router.push('/login')
        setMenuOpen(!menuOpen)
    }

    return (
        <div className={styles.mobileHeader}>
            <Link href="/" onClick={() => (setMenuOpen(false))} className={styles.logo}>
                <MainIco className={styles.mainIcon} />
                <label className={styles.logoText}>
                    <span className={styles.bold}>{t('logoFirst')}</span>
                    <span className={styles.bold}>{t('logoSecond')}</span>
                    <span className={styles.bold}>{t('country')}</span>
                </label>
            </Link>
            <div className={styles.spacer}>
                <Link href="/search">
                    <LoopIco className={styles.loopIco} />
                </Link>
                {/* Burger button */}
                <button
                    className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/*{menuOpen && (*/}
            <nav className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
                <BurgerSection closeMenu={() => setMenuOpen(false)} />
                <MobileNavs closeMenu={() => setMenuOpen(false)} />

                <MobileSocial />
                {!isAuthenticated && <Button onClick={handleMenuClick} >Войти</Button>}
            </nav>
            {/*)}*/}
        </div>
    )
}

export default MobileHeader
