import React from "react";

interface FullWidthImageProps {
  imageSrc: string;
  imageAlt?: string;
}

const FullWidthImage = ({ 
  imageSrc
}: FullWidthImageProps) => {
  return (
    <div 
      className="w-full"
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