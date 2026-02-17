import React from "react";
import { useTranslations } from "next-intl";
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import s from "./FondPage.module.scss";
import Introduction from "./module/Introduction/Introduction";
import Doing from "./module/Doing/Doing";
import OurModele from "./module/OurModele/OurModele";
import Results from "./module/Results/Results";
import Member from "./module/Member/Member";

const FondPage = () => {
  const t = useTranslations("fondPage");
  
  return (
    <div className={s.fondPage}>
      <BannerPages url="/image/fond/fondMain.jpg">
        <div className={s.title}>
          <h1>{t("banner.title")}</h1>
        </div>
      </BannerPages>
      <div className={s.content}>
        <Introduction/>
        <Doing/>
        <OurModele/>
        <Results/>
        <Member/>
      </div>
    </div>
  );
};

export default FondPage;
