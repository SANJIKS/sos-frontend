import React from 'react';
import  s from './Vacancies.module.scss'
import BannerPages from "@/shared/ui/BannerPages/BannerPages";
import {Card} from "@/appLayer/VacanciesPage/module";
import { useTranslations } from 'next-intl';
import { vacancyType } from './type';

function VacanciesPage({ vacancies }: { vacancies: vacancyType[] }) {
    const t = useTranslations('vacanciesPage')
    return (
        <div className={s.VacanciesPage}>
        <BannerPages url={"/image/vacancies/banner.png"}>
             <div className={s.bannerTitel}>
                 <h1>{t('banner.title')}</h1>
                 <p>{t('banner.subtitle')}</p>
             </div>
        </BannerPages>
            <div className={s.contend}>
                <h2>{t('current')}</h2>
                <div className={s.items}>
                    {
                        vacancies.length > 0 && vacancies.map((item, i) => (
                            <Card key={i} vacancy={item} />
                        ))
                    }
                    {
                        vacancies.length === 0 && ( 
                            <div className={s.empty}>
                                <h2>{t('empty')}</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default VacanciesPage;