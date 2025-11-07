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
    // Cache images for 31 days to reduce transformations and cache writes
    minimumCacheTTL: 2678400,
    // Use only WebP format to reduce number of transformations
    formats: ['image/webp'],
    // Limit device sizes to reduce transformations and cache writes
    // Note: Next.js generates srcset from ALL deviceSizes, regardless of width prop
    // The browser uses 'sizes' to choose which to download, but we still generate all
    // Hero/ScrollSections need 1920, ImageSlider needs 1200, others max at 1080
    // For images with width={800}, browser will choose 640w or 828w based on sizes, not 1920w
    deviceSizes: [640, 828, 1080, 1200, 1920],
    // Limit image sizes to reduce transformations and cache writes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Limit quality options to reduce possible transformations
    qualities: [75, 85, 100],
  },
  // Disable static generation and caching
  output: 'standalone',
  // Force dynamic rendering for all pages
  trailingSlash: false,
};

export default nextConfig;
