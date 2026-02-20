"use client";

import React, {FC, useState} from 'react'
import styles from './MobileNavs.module.scss'
import {useTranslations} from 'next-intl'
import {Link, usePathname} from '@/i18n/navigation'
import {mobileNav} from '@/widget/Header/constants/navData'
import {classNames} from '@/shared/lib/classNames'

interface MobileNavsProps {
    closeMenu: () => void;
}

const MobileNavs: FC<MobileNavsProps> = ({closeMenu}) => {
    const t = useTranslations();
    const pathname = usePathname();
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const subNavs: Record<string, { title: string; link: string }[]> = {
        "/about": [
            { title: "fond", link: "fond" },
            { title: "foundationHistory", link: "foundation-history" },
        ],
        "/our-friends": [
            { title: "partners", link: "partners" },
            { title: "becomeFriend", link: "friends" },
            { title: "corporateDonors", link: "corporate-donors" },
        ],
    };

    const handleSubMenuClick = (path: string) => {
        setOpenSubMenu(openSubMenu === path ? null : path);
    };

    // Проверка активного пути (подсветка)
    const isActivePath = (basePath: string) => pathname.startsWith(basePath);

    return (
        <div className={styles.mobileNavs}>
            {mobileNav.map((item, i) => {
                const hasSubNav = Boolean(subNavs[item.path]);
                const isActive = isActivePath(item.path);

                return (
                    <div key={i} className={styles.navItem}>
                        {hasSubNav ? (
                            <button
                                className={classNames(styles.tab, { [styles.active]: isActive })}
                                onClick={() => handleSubMenuClick(item.path)}
                            >
                                {t(item.title)}
                            </button>
                        ) : (
                            <Link
                                href={item.path}
                                className={classNames(styles.tab, { [styles.active]: isActive })}
                                onClick={closeMenu}
                            >
                                {t(item.title)}
                            </Link>
                        )}

                        {hasSubNav && (
                            <div
                                className={classNames(styles.subMenu, {
                                    [styles.open]: openSubMenu === item.path || isActive,
                                })}
                            >
                                {subNavs[item.path].map((sub, j) => (
                                    <Link
                                        href={`${item.path}/${sub.link}`}
                                        key={j}
                                        className={classNames(styles.subLink, {
                                            [styles.activeSub]: pathname.startsWith(`${item.path}/${sub.link}`)
                                        })}
                                        onClick={closeMenu}
                                    >
                                        {t(`nav.${sub.title}`)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MobileNavs;
