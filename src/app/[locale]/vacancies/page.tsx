import React from 'react';
import VacanciesPage from "@/appLayer/VacanciesPage/VacanciesPage";
import { $apiClient } from '@/shared/api/api_client';
type TVacancy = {
id: number;
title: string;
description: string;
address: string;
work_schedule: string;
deadline: string;
}
async function Page() {
const response = await $apiClient.get<TVacancy[]>('/vacancies');
    return (
        <VacanciesPage vacancies={response.data as TVacancy[]} />
    );
}

export default Page;