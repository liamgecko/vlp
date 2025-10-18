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
  fallbackAlt?: string;
}

const FullWidthImage = ({ 
  featuredImage,
  fallbackImage = "/vlp-05.jpg",
  fallbackAlt = "Beautiful wedding photography moment"
}: FullWidthImageProps) => {
  const imageSrc = featuredImage?.node?.sourceUrl || fallbackImage;
  const imageAlt = featuredImage?.node?.altText || fallbackAlt;

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