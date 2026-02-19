import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    compress: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn-1.aki.kg' },
            { protocol: 'https', hostname: 'cdn-0.aki.kg' },
            { protocol: 'http', hostname: '34.41.110.7' },
            { protocol: 'https', hostname: 'sos-kyrgyzstan.org' },
            { protocol: 'http', hostname: 'sos-kyrgyzstan.org' },
            { protocol: 'http', hostname: 'api.sos-kyrgyzstan.org' },
            { protocol: 'https', hostname: 'api.sos-kyrgyzstan.org' }
        ]
    },
    webpack(config) {
        // Находим стандартное правило Next.js для работы с файлами
        const assetRule = config.module.rules.find(
            (rule: any) => typeof rule === "object" && rule?.test?.test?.(".svg")
        );

        // Исключаем SVG из стандартного загрузчика
        if (assetRule) {
            assetRule.exclude = Array.isArray(assetRule.exclude)
                ? [...assetRule.exclude, /\.svg$/i]
                : [/\.svg$/i];
        }

        // Передаем ВСЕ SVG в @svgr/webpack (как было в твоем оригинальном файле)
        config.module.rules.push({
            test: /\.svg$/i,
            use: ["@svgr/webpack"],
        });

        return config;
    }
}

export default withNextIntl(nextConfig)