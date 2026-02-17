import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['ru', 'ky', 'en'] as const

type Locale = 'ru' | 'ky' | 'en'

export default getRequestConfig(async ({ requestLocale }) => {
    // requestLocale теперь Promise, нужно его await
    const locale = await requestLocale

    if (typeof locale !== 'string' || !locales.includes(locale as Locale)) {
        notFound()
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
        locale
    }
})