/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.creatoryogames.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;