'use client';

import { useEffect, useState } from 'react';
import FullWidthImage from '@/components/FullWidthImage';

interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

const FullWidthImageClient = () => {
  const [featuredImage, setFeaturedImage] = useState<FeaturedImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedImage = async () => {
      try {
        // Get current pathname
        const pathname = window.location.pathname;
        let slug = 'home';
        
        // Extract slug from pathname
        if (pathname === '/') {
          slug = 'home';
        } else if (pathname === '/wedding-photography-blog' || pathname === '/blog') {
          slug = 'wedding-photography-blog';
        } else if (pathname.startsWith('/blog/') || pathname.startsWith('/wedding-photography-blog/')) {
          // For individual blog posts, we'll use the blog page featured image
          slug = 'wedding-photography-blog';
        } else if (pathname !== '/') {
          // For other pages, extract slug from pathname
          slug = pathname.substring(1); // Remove leading slash
        }

        // Fetch the page data
        const response = await fetch('/api/page-featured-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setFeaturedImage(data.featuredImage);
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedImage();
  }, []);

  if (loading) {
    // Show fallback image while loading
    return <FullWidthImage />;
  }

  return <FullWidthImage featuredImage={featuredImage || undefined} />;
};

export default FullWidthImageClient;
