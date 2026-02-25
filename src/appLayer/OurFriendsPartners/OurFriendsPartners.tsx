import React from 'react';
import s from "./OurFriendsPartners.module.scss";
import { Cards } from "@/appLayer/OurFriends/module";
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import OurFriendsFeedbackForm from "@/shared/ui/FeedbackForm/OurFriendsFeedbackForm";
import Partners from '@/appLayer/Partners/Partners'

const OurFriendsPartners = async () => {
    const t = useTranslations('ourFriendsPartners')
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
            <div className={s.info}>
                <OurFriendsFeedbackForm
                    title={t('form.title')}
                    description={t('form.description')}
                    translationKey="contacts.feedbackForm"
                    recipientEmail="info@soskyrgyzstan.kg"
                />
                <Partners />
            </div>
        </>
    );
};

export default OurFriendsPartners;