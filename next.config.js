/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to enable API routes
  // output: 'export', // Commented out to allow API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;