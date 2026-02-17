'use client'

import React, {useEffect} from 'react'
import styles from './HeaderUp.module.scss'
import HeaderSection from '../HeaderSection/HeaderSection'
import HeaderSocial from '../HeaderSocial/HeaderSocial'
import HeaderNavs from '../HeaderNavs/HeaderNavs'
import MobileHeader from '@/widget/MobileHeader/MobileHeader'
import {useAuthStore} from '@/store/useAuthStore'

const HeaderUp = () => {
    const initializeAuth = useAuthStore((s) => s.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <>
            <div className={styles.mobileHeader}>
                <MobileHeader/>
            </div>

            <div className={styles.headerUp}>
                <HeaderSocial/>
                <HeaderNavs/>
                <HeaderSection/>
            </div>
        </>
    )
}

export default HeaderUp