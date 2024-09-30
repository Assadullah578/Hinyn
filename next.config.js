/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Hinyn', // Your repository name
  assetPrefix: '/Hinyn/',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['murmuring-everglades-65320-580682e5248e.herokuapp.com'],
  },
};

module.exports = nextConfig;
