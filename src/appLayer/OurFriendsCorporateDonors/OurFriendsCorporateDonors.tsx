import React from 'react';
import s from "./OurFriendsCorporateDonors.module.scss";
import { useTranslations } from 'next-intl';
import OurFriendsFeedbackForm from "@/shared/ui/FeedbackForm/OurFriendsFeedbackForm";
import CorporateDonorsSlider from '@/appLayer/CorporateDonorsSlider/CorporateDonorsSlider';

const OurFriendsCorporateDonors = () => {
    const t = useTranslations('ourFriendsCorporateDonors')
    return (
        <div className={s.ourFriendsCorporateDonors}>
            <div className={s.info}>
                <OurFriendsFeedbackForm
                    title={t('form.title')}
                    description={t('form.description')}
                    translationKey="contacts.feedbackForm"
                    recipientEmail="Cholpon.Akhunova@soskyrgyzstan.kg"
                />
            <CorporateDonorsSlider />
            </div>
        </div>
    )
}

export default OurFriendsCorporateDonors;
