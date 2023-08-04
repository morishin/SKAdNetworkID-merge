/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? 'https://morishin.github.io/SKAdNetworkID-merge/' : undefined,
}

module.exports = nextConfig
