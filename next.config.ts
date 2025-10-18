import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'victoria-photography.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'victoria-photography.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.victoria-photography.co.uk',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Disable static generation and caching
  output: 'standalone',
  // Force dynamic rendering for all pages
  trailingSlash: false,
};

export default nextConfig;
