import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  output: 'standalone',
  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule) => typeof rule === "object" && rule?.test?.test?.(".svg")
    );
    if (assetRule) {
      assetRule.exclude = Array.isArray(assetRule.exclude)
        ? [...assetRule.exclude, /\.svg$/i]
        : [/\.svg$/i];
    }

    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-1.aki.kg",
      },
      {
        protocol: "https",
        hostname: "cdn-0.aki.kg",
      },
      {
        protocol: 'https',
        hostname: 'sos-kyrgyzstan.org',
      },
      {
        protocol: 'https',
        hostname: 'api.sos-kyrgyzstan.org',
      },
      ],
  },
  eslint: {
    ignoreDuringBuilds: true, // хотим проверять, но можно выключить при билде
  },
};

export default withNextIntl(nextConfig);


