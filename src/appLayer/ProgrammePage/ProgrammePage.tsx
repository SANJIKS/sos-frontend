import React from "react";
import { useTranslations } from "next-intl";
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import s from "./ProgrammePage.module.scss";
import Donation from "@/shared/ui/Donation/Donation";
import Blocks from "./module/Blocks/Blocks";
import DonationForm from "@/shared/ui/DonationForm/DonationForm";

const ProgrammePage = () => {
  const t = useTranslations("programmePage");

  return (
    <div className={s.programmePage}>
      <BannerPages url="/image/fond/fondMain.jpg">
        <div className={s.title}>
          <h1>{t("banner.title")}</h1>
          <p className={s.description}>
            {t("banner.description")}
          </p>
          <div className={s.donation}>
            <span className={s.bold}>{t("banner.supportText")}</span>
            <Donation />
          </div>
        </div>
      </BannerPages>
      <div className={s.content}>
        <Blocks />
        <DonationForm/>
      </div>
    </div>
  );
};

export default ProgrammePage
