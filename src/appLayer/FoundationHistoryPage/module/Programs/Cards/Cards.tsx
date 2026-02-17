import React from "react";
import Image from "next/image";
import { $apiClient } from '@/shared/api/api_client';
import { unstable_rootParams } from 'next/server';
import s from "../Programs.module.scss";

type Program = {
    id: number;
    title: string;
    description: string;
    image: string | null;
    is_active: boolean;
    order: number;
};

type ProgramsResponse = {
    data: Program[];
    error: string | null;
    success: boolean;
};

export const ProgramsCards = async () => {
    const { locale } = await unstable_rootParams();
    
    const searchParams = new URLSearchParams({
        lang: (Array.isArray(locale) ? locale[0] : locale) || 'ru'
    });
    
    const url = `/programs/?${searchParams.toString()}`;
    const response = await $apiClient.get<ProgramsResponse>(url);

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        return null;
    }
    
    return (
        <ul className={s.programsList}>
            {response.data.map((program) => (
                <li key={program.id} className={s.programItem}>
                    <span className={s.imageWrapper}>
                        <Image 
                            src={program.icon || '/image/foundation-history/programs-default.jpg'} 
                            alt={program.title} 
                            fill 
                            style={{ objectFit: 'cover' }}
                            blurDataURL={program.icon || '/image/foundation-history/programs-default.jpg'} 
                        />
                    </span>
                    <p>{program.title}</p>
                </li>   
            ))}
        </ul>
    );
};