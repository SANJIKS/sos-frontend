"use client";

import React from "react";
import { useTranslations } from "next-intl";
import s from "./Doing.module.scss";
import HistoryIco from "@/assets/icons/history1.svg";
import ParenthoodIco from "@/assets/icons/parenthood.svg";
import EducationIco from "@/assets/icons/education.svg";
import CrisisIco from "@/assets/icons/crisis.svg";
import SibblingIco from "@/assets/icons/sibbling.svg";
import MultiIco from "@/assets/icons/multi.svg";

const icons = [HistoryIco, CrisisIco, ParenthoodIco, EducationIco, MultiIco, SibblingIco];

const Doing = () => {
  const t = useTranslations('fondPage.doing');
  
  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
    t('items.4'),
    t('items.5'),
  ];
  
  return (
    <section className={s.doing}>
      <div className={s.title}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <div className={s.doingList}>
        {items.map((text, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className={s.doingItem}>
              <Icon />
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Doing;
