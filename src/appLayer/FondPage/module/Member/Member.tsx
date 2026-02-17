"use client";

import React from "react";
import { useTranslations } from "next-intl";
import s from "./Member.module.scss";
import Image from "next/image";

const Member = () => {
  const t = useTranslations('fondPage.member');
  
  return (
    <section className={s.member}>
      <div className={s.title}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <div className={s.memberImage}>
        <Image src={`/image/fond/unicef.png`} alt='member' fill objectFit='cover' blurDataURL={`/image/fond/unicef.png`} />
      </div>
    </section>
  );
};

export default Member;
