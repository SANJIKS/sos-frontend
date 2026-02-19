import React from 'react';
import VacanciesPage from "@/appLayer/VacanciesPage/VacanciesPage";
import { $serverApiClient } from '@/shared/api/server_api_client';

type TVacancy = {
    id?: number;
    title: string;
    description: string;
    address: string;
    work_schedule: string;
    deadline: string;
}

async function Page() {
    let vacancies: TVacancy[] = [];
    try {
        const response = await $serverApiClient.get<TVacancy[]>('/vacancies/');
        vacancies = response.data ?? [];
    } catch (e) {
        console.error('Vacancies fetch error:', e);
    }
    return <VacanciesPage vacancies={vacancies} />;
}

export default Page;