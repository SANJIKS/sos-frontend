'use client'

import React, {useEffect, useRef, useState} from 'react'
import styles from './HeaderNavs.module.scss'
import {useTranslations} from 'next-intl'
import {Link, usePathname} from '@/i18n/navigation'
import {nav} from '../../constants/navData'
import {classNames} from '@/shared/lib/classNames'

const subNavs: Record<string, { title: string; link: string }[]> = {
    '/about': [
        {title: 'fond', link: 'fond'},
        {title: 'foundationHistory', link: 'foundation-history'}
    ],
    '/our-friends': [
        {title: 'partners', link: 'partners'},
        {title: 'becomeFriend', link: 'friends'},
        {title: 'corporateDonors', link: 'corporate-donors'}
    ]
}       

const HeaderNavs = () => {
    const t = useTranslations()
    const pathname = usePathname()
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const isActive = (path: string) => pathname.startsWith(path)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenSubMenu(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        setOpenSubMenu(null)
    }, [pathname])

    return (
        <div className={styles.headerNavs} ref={menuRef}>
            {nav.map((item, i) => {
                const hasSubNav = Boolean(subNavs[item.path])

                return (
                    <div
                        key={i}
                        className={styles.navItem}
                        onClick={() => hasSubNav && setOpenSubMenu(item.path)}
                    >
                        <Link
                            href={item.path}
                            className={classNames(styles.tab, {[styles.active]: isActive(item.path)})}
                            onClick={(e) => {
                                if (item.path === '/about' || item.path === '/our-friends') {
                                    e.preventDefault()
                                }
                                setOpenSubMenu(null)
                            }}
                        >
                            {t(item.title)}
                        </Link>

                        {/* Dropdown */}
                        {hasSubNav && (
                            <div
                                className={classNames(
                                    styles.dropdown,
                                    { [styles.open]: openSubMenu === item.path } // открытие/закрытие через класс
                                )}
                            >
                                {subNavs[item.path]?.map((sub, j) => (
                                    <Link
                                        href={`${item.path}/${sub.link}`}
                                        key={j}
                                        className={classNames(styles.dropdownItem, {
                                            [styles.activeItem]: `${item.path}/${sub.link}` === pathname,
                                        })}
                                        onClick={() => setOpenSubMenu(null)}
                                    >
                                        {t(`nav.${sub.title}`)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default HeaderNavs

