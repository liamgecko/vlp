import React from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
}

// Default blur data URL for better loading experience
const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL = defaultBlurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  ...props
}) => {
  // Validate required props
  if (!src) {
    console.warn('OptimizedImage: src prop is required');
    return null;
  }

  if (!alt) {
    console.warn('OptimizedImage: alt prop is required for accessibility');
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      className={className}
      {...props}
    />
  );
};

// Specialized components for different use cases
export const HeroImage: React.FC<Omit<OptimizedImageProps, 'priority' | 'sizes'>> = (props) => (
  <OptimizedImage
    {...props}
    priority={true}
    sizes="100vw"
    quality={85}
  />
);

export const CardImage: React.FC<Omit<OptimizedImageProps, 'sizes'>> = (props) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    quality={80}
  />
);

export const GalleryImage: React.FC<Omit<OptimizedImageProps, 'sizes'>> = (props) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    quality={85}
  />
);

export const ThumbnailImage: React.FC<Omit<OptimizedImageProps, 'sizes'>> = (props) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 768px) 50vw, 25vw"
    quality={70}
  />
);

export default OptimizedImage;
