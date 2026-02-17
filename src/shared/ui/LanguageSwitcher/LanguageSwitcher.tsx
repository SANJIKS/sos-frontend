'use client'

import React, {FC, useEffect, useRef, useState} from 'react'
import Cookies from 'js-cookie'
import styles from './LanguageSwitcher.module.scss'
import GlobalIco from '@/assets/icons/global.svg'
import DownIco from '@/assets/icons/arrow-down.svg'
import GlobalMIco from '@/assets/icons/mobileGlobal.svg'
import DownMIco from '@/assets/icons/mobileArrow.svg'
import {usePathname, useRouter} from '@/i18n/navigation'
import {useLocale} from 'next-intl'

const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'ky', label: 'Кыргызча' },
]

interface Language {
    isMobile: boolean
}

const LanguageSwitcher:FC<Language> = ( {isMobile} ) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = useLocale()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const changeLanguage = (lang: string) => {
        setOpen(false)
        Cookies.set('NEXT_LOCALE', lang, { expires: 365 })
        router.push(pathname, { locale: lang })
    }

    return (
        <div className={styles.language} ref={ref}>
            <button className={styles.languageBtn} onClick={() => setOpen(prev => !prev)}>
                {/*<GlobalIco className={styles.globalIcon} />*/}
                {isMobile ? <GlobalMIco className={styles.globalIcon} /> : <GlobalIco className={styles.globalIcon} />}
                {/*<span>{languages.find(l => l.code === currentLocale)?.label}</span>*/}
                {/*<DownIco className={styles.downIcon} />*/}
                {isMobile ? <DownMIco className={styles.downIcon} /> : <DownIco className={styles.downIcon} />}
            </button>

            {open && (
                <div className={styles.languageMenu}>
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            disabled={lang.code === currentLocale}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
