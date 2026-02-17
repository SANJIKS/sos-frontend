import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    compress: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        })
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-1.aki.kg'
            },
            {
                protocol: 'https',
                hostname: 'cdn-0.aki.kg'
            },
            {
                protocol: 'http',
                hostname: '34.41.110.7'
            },
            {
                protocol: 'https',
                hostname: 'sos-kyrgyzstan.org'
            },

            {
                protocol: 'http',
                hostname: 'sos-kyrgyzstan.org'
            },
            {
                protocol: 'http',
                hostname: 'api.sos-kyrgyzstan.org'
            },
            {
                protocol: 'https',
                hostname: 'api.sos-kyrgyzstan.org'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: false // хотим проверять, но можно выключить при билде
    }
}

export default withNextIntl(nextConfig)
