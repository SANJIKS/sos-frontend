import React from 'react';
import { useTranslations } from 'next-intl';
import s from './ChildProtectionPolicy.module.scss';
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import DonationForm from "@/shared/ui/DonationForm/DonationForm";

interface PolicySection {
    title: string;
    content: string;
    contactInfo?: {
        workingHours: string;
        phones: {
            bishkek: string;
            cholponAta: string;
        };
        email: string;
    };
}

const ChildProtectionPolicy = () => {
    const t = useTranslations('childProtectionPolicy')
    const sections = t.raw('sections') as PolicySection[]
    return (
        <div className={s.childProtectionPolicy}>
            <BannerPages url={"/image/child-protection-policy/banner.png"} >
                <div className={s.bannerTitle}>
                    <h1>{t('title')}</h1>
                    <h2>{t('subtitle')}</h2>
                </div>
            </BannerPages>
            <div className={s.contend}>
                <div className={s.info}>
                    {
                        sections.map((section, key) => (
                            <div className={s.item} key={key}>
                                <h3>{section.title}</h3>
                                <p>{section.content}</p>
                                {section.contactInfo && (
                                    <div className={s.contactInfo}>
                                        <p><strong>{section.contactInfo.workingHours}</strong></p>
                                        <p>{section.contactInfo.phones.bishkek}</p>
                                        <p>{section.contactInfo.phones.cholponAta}</p>
                                        <p>{section.contactInfo.email}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
                <DonationForm />
            </div>
        </div>
    )
}
export default ChildProtectionPolicy

    