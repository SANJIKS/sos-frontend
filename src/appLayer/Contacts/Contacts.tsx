import  React from 'react'
import  s from './Contacts.module.scss'
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import {ContactsList} from "./module/index";
import DonationForm from "@/shared/ui/DonationForm/DonationForm";
import FeedbackForm from "@/shared/ui/FeedbackForm/FeedbackForm";
import { useTranslations } from 'next-intl'


const Contacts = () =>  {
     const t = useTranslations('contacts')
     return  (
         <div className={s.contacts}>
             <BannerPages url={"/image/contact/banner.png"} >
                 <div className={s.bannerTitle}>
                     <span>
                        <h1>{t('banner.title')}</h1>
                        <h2>{t('banner.subtitle')}</h2>
                     </span>
                     <ul>
                         <li>
                             <a href="#">
                                {t('banner.address')}
                             </a>
                         </li>
                         <li>
                             <a href="#">
                                {t('banner.email')}
                             </a>
                         </li>
                         <li>
                            <a href="#">{t('banner.phone')}</a>
                         </li>
                     </ul>
                 </div>
             </BannerPages>
             <div className={s.contend}>
                 <ContactsList/>
                 <FeedbackForm title={t('feedback.title')} description={t('feedback.description')}/>
                 <DonationForm/>
                
             </div>
         </div>
     )
}
export  default  Contacts