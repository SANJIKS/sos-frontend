import  React from 'react';
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import s from "./FAQPage.module.scss";
import Donation from "@/shared/ui/Donation/Donation";
import FeedbackForm from "@/shared/ui/FeedbackForm/FeedbackForm";
import DonationForm from "@/shared/ui/DonationForm/DonationForm";
import FAQ from "@/shared/ui/FAQ/FAQ";
import { useTranslations } from 'next-intl';
type TFAQ = {
    id: number;
    question: string;
    answer: string;
    number_of_questions: number;
}

const FAQPage = ({ faq }: { faq: Array<TFAQ> }) => {
    const t = useTranslations('faqPage')
     return (
         <div className={s.FAQPage}>
             <BannerPages url={"/image/faq/banner.png"}>
                 <div className={s.title}>
                    <h1>{t('banner.title')}</h1>
                    <p className={s.description}>{t('banner.description')}</p>
                     <div className={s.donation}>
                        <span className={s.bold}>{t('banner.supportText')}</span>
                         <Donation />
                     </div>
                 </div>
             </BannerPages>
             <div className={s.contend}>
                <FAQ faq={faq as Array<TFAQ>}/>
                <FeedbackForm title={t('feedback.title')} description={t('feedback.description')}/>
                 <DonationForm/>
             </div>
         </div>
     )
}

export default FAQPage