"use client";

import React from "react";
import { useTranslations } from "next-intl";
import s from "./OurModele.module.scss";
import Image from "next/image";

const OurModele = () => {
  const t = useTranslations('fondPage.ourModel');
  
  const list = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
  ];
  
  return (
    <section className={s.ourModele}>
      <div className={s.title}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <div className={s.block}>
        {
          list.map((title, index) => (
            <div className={s.blockItem} key={index}>
              <div className={s.itemImage}>
                    <Image src={`/icons/foundation-history/Principles-item-${index}.svg`} alt='principles' fill objectFit='cover' blurDataURL={`/icons/foundation-history/Principles-item-${index + 1}.svg`} />
              </div>
                <h3>{title}</h3>
            </div>
          )
        )
        }
      </div>
    </section>
  );
};

export default OurModele;
