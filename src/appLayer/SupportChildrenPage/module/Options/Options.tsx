"use client";

import React from "react";
import { useTranslations } from "next-intl";
import s from "./Options.module.scss";
import Button from "@/shared/ui/Button/Button";
import HandIco from "../../../../../public/icons/support/hand.svg";
import ChildIco from "../../../../../public/icons/support/childWorld.svg";

const Options = () => {
  const t = useTranslations('supportChildrenPage.options');
  
  return (
    <div className={s.options}>
      <p>{t('title')}</p>
      <Button iconLeft={<HandIco />} className={s.btn} theme="red">
        {t('corporate')}
      </Button>
      <Button iconLeft={<ChildIco />} className={s.btn} theme="blue">
        {t('subscription')}
      </Button>
    </div>
  );
};

export default Options;
