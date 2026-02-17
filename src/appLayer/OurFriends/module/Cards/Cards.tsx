import React from 'react'
import s from './Cards.module.scss'
import { $apiClient } from '@/shared/api/api_client'
import { unstable_rootParams } from 'next/server'

type Partner = {
    id: number;
    name: string;
    category: string;
    logo: string | null;
    created_at: string;
    updated_at: string;
};

type PartnersResponse = {
    data: Partner[];
    error: string | null;
    success: boolean;
};

const Cards = async ({ title, category }: { title: string, category?: string }) => {
    const { locale } = await unstable_rootParams()
    
    const searchParams = new URLSearchParams();
    searchParams.append('lang', (Array.isArray(locale) ? locale[0] : locale) || 'ru');
    if (category) {
        searchParams.append('category', category);
    }
    const url = `/partners?${searchParams.toString()}`;
    const response = await $apiClient.get<PartnersResponse>(url);

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        return null
    }
    return (
        <div className={s.cards}>
            <h3>{title}</h3>
            <div className={s.cardList}>
                {response.data.map((partner: Partner) => (
                    <div key={partner.id} className={s.card}>
                        <div className={s.cardImage}>
                            <img src={partner.logo || ''} alt={partner.name} />
                            {partner.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards
