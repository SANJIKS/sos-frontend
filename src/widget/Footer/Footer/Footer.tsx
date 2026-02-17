import React from 'react'
import styles from './Footer.module.scss'
import FooterSocials from '../FooterSocials/FooterSocials'
import FooterInfo from '../FooterInfo/FooterInfo'
import Donation from '@/shared/ui/Donation/Donation'
import {usePathname} from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()

    const hideDonationPaths = ['programs', 'news', 'our-friends', 'child-protection-policy', 'faq']
    const shouldHideDonation = hideDonationPaths.some(path => pathname.includes(path))

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {!shouldHideDonation && (
                    <div className={styles.footerDonation}>
                        <Donation/>
                    </div>
                )}
                <FooterInfo/>
                <FooterSocials/>
                <div className={styles.line}/>
                <div className={styles.copyright}>
                    © 2025 SOS Детские деревни Кыргызстана. Все права защищены
                </div>
            </div>
        </footer>
    )
}

export default Footer
