import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['ru', 'ky', 'en'],
    defaultLocale: 'ru'
})

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}