'use client'

import React, {useEffect} from 'react'
import {useTranslations} from 'next-intl'
import Image from 'next/image'
import s from './SocialMedia.module.scss'
import {useSocialNetworksStore} from '@/store/useSocialNetworksStore'
import {SOCIAL_LINKS} from '@/shared/constants/socials'

const SocialMedia = () => {
    const t = useTranslations('socialMedia')
    const { socialNetworks, fetchSocialNetworks } = useSocialNetworksStore()

    useEffect(() => {
        fetchSocialNetworks()
    }, [fetchSocialNetworks])

    const defaultLinks = {
        instagram: SOCIAL_LINKS.instagram,
        facebook: SOCIAL_LINKS.facebook,
        youtube: SOCIAL_LINKS.youtube,
        linkedin: SOCIAL_LINKS.linkedin
    }

    const getUrl = (type: string) => {
        const network = socialNetworks.find((n) => n.network_type === type)
        return network?.url || defaultLinks[type as keyof typeof defaultLinks]
    }

    const icons = [
        {type: 'instagram', src: '/icons/donate/icons/instagram.svg', alt: 'Instagram'},
        {type: 'facebook', src: '/icons/donate/icons/facebook.svg', alt: 'Facebook'},
        {type: 'youtube', src: '/icons/donate/icons/youtube.svg', alt: 'Youtube'},
        {type: 'linkedin', src: '/icons/donate/icons/linkedin.svg', alt: 'Linkedin'}
    ]

    return (
        <div className={s.socialMedia}>
            <h3>{t('title')}</h3>
            <ul className={s.socialMediaList}>
                {icons.map(({type, src, alt}) => (
                    <li key={type}>
                        <a href={getUrl(type)} target="_blank" rel="noopener noreferrer">
                            <Image src={src} alt={alt} width={120} height={120}/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SocialMedia
