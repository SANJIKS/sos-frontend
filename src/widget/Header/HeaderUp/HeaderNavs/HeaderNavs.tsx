"use client";

import React from 'react'
import styles from './HeaderNavs.module.scss'
import {useTranslations} from 'next-intl'
import {Link, usePathname} from '@/i18n/navigation'
import {nav2} from '../../constants/navData'
import {classNames} from '@/shared/lib/classNames'

const HeaderNavs = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className={styles.headerNavs}>
      {nav2.map((item, i) => {
        return (
          <Link
            className={classNames(styles.tab, {
              [styles.active]: `${item.path}` === pathname,
            })}
            href={item.path}
            key={i}
            // onClick={onTabClick}
          >
            {t(item.title)}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderNavs;
