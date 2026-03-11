import React from 'react';
import s from "./OurFriendsPartners.module.scss";
import { Cards } from "@/appLayer/OurFriends/module";
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import LogoSection from "@/appLayer/OurFriendsPartners/LogoSection";

const OurFriendsPartners = async () => {
    const t = await getTranslations('ourFriendsPartners')
    const locale = await getLocale()

    return (
        <>
            <div className={s.ourFriends}>
                <Cards title={t('civicOrganizations')} category="civil_organizations" locale={locale} />
                <Cards title={t('governmentAgencies')} category="government_agencies" locale={locale} />
                <Cards title={t('internationalOrganizations')} category="international_organizations" locale={locale} />
                <Cards title={t('foreignGovernments')} category="foreign_governments" locale={locale} />
                <Cards title={t('otherOrganizations')} category="other_organizations" locale={locale} />
            </div>

            {/* Логотипы партнёров + кнопка "Стать партнёром" */}
            <LogoSection />
        </>
    );
};

export default OurFriendsPartners;