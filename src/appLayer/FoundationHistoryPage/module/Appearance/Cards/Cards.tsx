import React from "react";
import Image from "next/image";
import s from "../Appearance.module.scss";
import { $apiClient } from '@/shared/api/api_client';
import { unstable_rootParams } from 'next/server';

type TimelineEvent = {
    id: number;
    title: string;
    description: string;
    event_type: string;
    event_type_display: string;
    icon: string | null;
    image: string | null;
    is_featured: boolean;
    location: string;
    order: number;
    year: string;
};

type TimelineResponse = {
    data: TimelineEvent[];
    error: string | null;
    success: boolean;
};

export const Cards = async () => {
    const { locale } = await unstable_rootParams();
    const searchParams = new URLSearchParams({
        is_active: 'false',
        ordering: 'order',
        lang: (Array.isArray(locale) ? locale[0] : locale) || 'ru'
    });
    const url = `/timeline/events/?${searchParams.toString()}`;
    const response = await $apiClient.get<TimelineResponse>(url);
    if (    
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
    ) {
        return null;
    }
    return (
        <div className={s.cards}>
            {response.data.map((event) => (
                <div className={s.card} key={event.id}>
                    <div className={s.cardText}>
                        <span>
                            <Image 
                                src={event.icon || '/icons/foundation-history/Introduction-card-iconst.svg'} 
                                alt={event.title} 
                                width={56} 
                                height={41} 
                                blurDataURL={event.icon || '/icons/foundation-history/Introduction-card-iconst.svg'} 
                            />
                            <h4>{event.year}</h4>
                        </span>
                        <p>{event.description}</p>
                    </div>
                    <div className={s.cardImage}>
                        <Image 
                            src={event.image || '/image/foundation-history/Appearance-card.png'} 
                            alt={event.title} 
                            fill 
                            style={{ objectFit: 'cover' }} 
                            blurDataURL={event.image || '/image/foundation-history/Appearance-card.png'} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};