import axios from 'axios';

export const $serverApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.sos-kyrgyzstan.org/api/v1',
    timeout: 30000,
});