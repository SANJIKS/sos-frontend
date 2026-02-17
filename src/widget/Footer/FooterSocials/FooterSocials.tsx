'use client'
import React, {useEffect} from 'react'
import styles from './FooterSocials.module.scss'
import {Link} from '@/i18n/navigation'
import {SOCIAL_LINKS} from '@/shared/constants/socials'
import {useSocialNetworksStore} from '@/store/useSocialNetworksStore'
import InstagramIco from '@/assets/icons/footerInst.svg'
import FacebookIco from '@/assets/icons/footerFacebook.svg'
import YoutubeIco from '@/assets/icons/footerYoutube.svg'
import XIco from '@/assets/icons/x.svg'
import AndroidIco from '@/assets/icons/android.svg'
import AppleIco from '@/assets/icons/apple.svg'

const FooterSocials = () => {
    const {socialNetworks, fetchSocialNetworks} = useSocialNetworksStore()

    // fallback — если API не вернул соцсети
    const defaultLinks = {
        twitter: SOCIAL_LINKS.x ?? 'https://x.com',
        facebook: SOCIAL_LINKS.facebook,
        instagram: SOCIAL_LINKS.instagram,
        youtube: SOCIAL_LINKS.youtube,
        android: 'https://www.android.com',
        apple: 'https://www.apple.com',
    }

    // подставляем ссылки из API, если они есть
    const getUrl = (type: string) => {
        const network = socialNetworks.find((n) => n.network_type === type)
        return network?.url || defaultLinks[type as keyof typeof defaultLinks]
    }

    useEffect(() => {
        fetchSocialNetworks()
    }, [fetchSocialNetworks])

    return (
        <div className={styles.footerSocials}>
            <Link href={getUrl('twitter')}><XIco /></Link>
            <Link href={getUrl('facebook')}><FacebookIco /></Link>
            <Link href={getUrl('instagram')}><InstagramIco /></Link>
            <Link href={getUrl('youtube')}><YoutubeIco /></Link>
            <Link href={getUrl('android')}><AndroidIco /></Link>
            <Link href={getUrl('apple')}><AppleIco /></Link>
        </div>
    )
}

export default FooterSocials
