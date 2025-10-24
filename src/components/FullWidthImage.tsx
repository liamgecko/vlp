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
    <>
      <style jsx>{`
        .parallax-block {
          height: 460px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url(${imageSrc});
          background-attachment: scroll; /* Default for mobile */
        }
        
        /* Enable parallax only on large screens */
        @media (min-width: 1024px) {
          .parallax-block {
            background-attachment: fixed;
          }
        }
      `}</style>
      <section className="parallax-block w-full" />
    </>
  );
};

export default FullWidthImage; 