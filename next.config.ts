import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBILIC_CLIENT_API_KEY: process.env.NEXT_PUBILIC_CLIENT_API_KEY,
    NEXT_PUBILIC_CLIENT_AUTHDOMAIN: process.env.NEXT_PUBILIC_CLIENT_AUTHDOMAIN,
    NEXT_PUBILIC_CLIENT_PROJECTID: process.env.NEXT_PUBILIC_CLIENT_PROJECTID,
    NEXT_PUBILIC_CLIENT_STORAGE_BUCKET:
      process.env.NEXT_PUBILIC_CLIENT_STORAGE_BUCKET,
    NEXT_PUBILIC_CLIENT_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBILIC_CLIENT_MESSAGING_SENDER_ID,
    NEXT_PUBILIC_CLIENT_APP_ID: process.env.NEXT_PUBILIC_CLIENT_APP_ID,
    NEXT_PUBILIC_CLIENT_MEASUREMENT:
      process.env.NEXT_PUBILIC_CLIENT_MEASUREMENT,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jootoor.com',
      },
    ],
  },
};

export default nextConfig;
