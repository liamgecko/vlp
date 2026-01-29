import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable Router Cache for dynamic pages so CMS edits appear on client navigation
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    // DISABLED: Bypass Vercel image optimization to avoid hitting limits
    // Images will be served directly from source without optimization
    unoptimized: true,
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
  // 301 Redirects
  async redirects() {
    return [
      {
        source: '/portfolio/canada-weddings',
        destination: '/wedding-photography',
        permanent: true,
      },
      {
        source: '/portfolio/destination-elopements',
        destination: '/wedding-photography',
        permanent: true,
      },
      {
        source: '/portfolio/uk-weddings',
        destination: '/wedding-photography',
        permanent: true,
      },
      // Redirect old blog post URLs to new wedding URLs
      {
        source: '/blog/:slug*',
        destination: '/wedding/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
