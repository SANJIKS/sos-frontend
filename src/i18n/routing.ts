import { defineRouting } from 'next-intl/routing'
 
export const routing = defineRouting({
    locales: ['ru', 'ky', 'en'],
    defaultLocale: 'ru',
    localeDetection: false
})