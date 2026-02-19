import React from 'react';
import s from "./OurFriendsPartners.module.scss";
import { Cards } from "@/appLayer/OurFriends/module";
import { useTranslations } from 'next-intl';
import OurFriendsFeedbackForm from "@/shared/ui/FeedbackForm/OurFriendsFeedbackForm";
import Partners from '@/appLayer/Partners/Partners'

const OurFriendsPartners = () => {
    const t = useTranslations('ourFriendsPartners')

    return (
        <>
            <div className={s.ourFriends}>
                <Cards title={t('civicOrganizations')} category="civil_organizations" />
                <Cards title={t('governmentAgencies')} category="government_agencies" />
                <Cards title={t('internationalOrganizations')} category="international_organizations" />
                <Cards title={t('foreignGovernments')} category="foreign_governments" />
                <Cards title={t('otherOrganizations')} category="other_organizations" />
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