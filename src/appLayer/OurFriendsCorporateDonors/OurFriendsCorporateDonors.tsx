

import React from 'react';
import s from "./OurFriendsCorporateDonors.module.scss";
import { Cards } from "@/appLayer/OurFriends/module";
import { useTranslations } from 'next-intl';
import OurFriendsFeedbackForm from "@/shared/ui/FeedbackForm/OurFriendsFeedbackForm";

const OurFriendsCorporateDonors = () => {
    const t = useTranslations('ourFriendsCorporateDonors')

    return (
        <div className={s.ourFriendsCorporateDonors}>
            <Cards title={t('title')} category="corporate_donors" />
            <div className={s.info}>
                <OurFriendsFeedbackForm 
                    title={t('form.title')} 
                    description={t('form.description')}
                    translationKey="contacts.feedbackForm"
                    recipientEmail="Cholpon.Akhunova@soskyrgyzstan.kg"
                />
            </div>
        </div>
    )
}

export default OurFriendsCorporateDonors;
