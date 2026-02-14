/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
  },
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

module.exports = nextConfig;
