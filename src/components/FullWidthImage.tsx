import React from "react";

interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

interface FullWidthImageProps {
  featuredImage?: FeaturedImage;
  fallbackImage?: string;
}

const FullWidthImage = ({ 
  featuredImage,
  fallbackImage = "/vlp-05.jpg"
}: FullWidthImageProps) => {
  const imageSrc = featuredImage?.node?.sourceUrl || fallbackImage;

  return (
    <section
      className="parallax-block w-full"
      style={{
        minHeight: '800px',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${imageSrc})`
      }}
    />
  );
};

export default FullWidthImage; 