'use client'

import React, {useEffect} from 'react'
import styles from './HeaderSocial.module.scss'
import FaceBookIco from '../../../../assets/icons/facebook.svg'
import LinkedIco from '../../../../assets/icons/linkedin.svg'
import InstaIco from '../../../../assets/icons/instagram.svg'
import YoutubeIco from '../../../../assets/icons/youtube.svg'
import {SOCIAL_LINKS} from '@/shared/constants/socials'
import {useSocialNetworksStore} from '@/store/useSocialNetworksStore'

const HeaderSocial = () => {
    const { socialNetworks, fetchSocialNetworks } = useSocialNetworksStore()

    useEffect(() => {
        fetchSocialNetworks()
    }, [fetchSocialNetworks])

    const defaultLinks = {
        facebook: SOCIAL_LINKS.facebook,
        linkedin: SOCIAL_LINKS.linkedin,
        instagram: SOCIAL_LINKS.instagram,
        youtube: SOCIAL_LINKS.youtube,
    }

    const getUrl = (type: string) => {
        const network = socialNetworks.find((n) => n.network_type === type)
        return network?.url || defaultLinks[type as keyof typeof defaultLinks]
    }

    return (
        <div className={styles.headerSocial}>
            <a
                href={getUrl('facebook')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
            >
                <FaceBookIco/>
            </a>
            <a
                href={getUrl('linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
            >
                <LinkedIco/>
            </a>
            <a
                href={getUrl('instagram')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
            >
                <InstaIco/>
            </a>
            <a
                href={getUrl('youtube')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
            >
                <YoutubeIco/>
            </a>
        </div>
    )
}

export default HeaderSocial
