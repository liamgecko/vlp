"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageTextProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  images?: Array<{ src: string; alt: string }>;
  variant: "left" | "right";
  buttonText?: string;
  buttonLink?: string;
}

const ImageText = ({ title, description, imageSrc, imageAlt, images, variant, buttonText, buttonLink }: ImageTextProps) => {
  const isLeftVariant = variant === "left";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const handleClick = () => {
    if (buttonLink) {
      window.open(buttonLink, '_blank');
    }
  };
  
  const textContent = (
    <motion.div 
      className="flex flex-col gap-4 w-full sm:w-1/2"
      initial={{ opacity: 0, x: isLeftVariant ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeftVariant ? 50 : -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-left text-balance">
        {title}
      </h2>          
      <p className="font-sans text-base text-[#554d77] text-left mt-4">
        {description}
      </p>
      {buttonText && (
        <a
          href="#"
          onClick={handleClick}
          className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 focus:ring-offset-blush-900 w-fit mt-8"
          role="button"
          tabIndex={0}
          aria-label={buttonText}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        >
          {buttonText}
        </a>
      )}
    </motion.div>
  );

  const imageContent = (
    <motion.div 
      className="flex flex-col gap-4 w-full sm:w-1/2 relative after:content-[''] after:absolute after:w-full after:aspect-[4/3] after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-4 after:top-4 after:rounded-2xl"
      initial={{ opacity: 0, x: isLeftVariant ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeftVariant ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      {images && images.length > 0 ? (
        <div className="rounded-2xl w-full max-h-[90vh] relative z-10 aspect-[4/3] overflow-hidden">
          {images.map((image, index) => (
            <div
              key={image.src}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.src})`,
                opacity: index === 0 ? 1 : 0,
                animation: isInView ? `fade-in-out 12s infinite` : 'none',
                animationDelay: isInView ? `${(index * 2) + 1}s` : '0s'
              }}
            />
          ))}
        </div>
      ) : imageSrc ? (
        <Image 
          src={imageSrc} 
          alt={imageAlt || ''} 
          width={1920} 
          height={1080} 
          className="rounded-2xl w-full max-h-[90vh] object-cover relative z-10 aspect-[4/3]" 
        />
      ) : null}
    </motion.div>
  );

  return (
    <section ref={ref} className="w-full bg-sunflower-100 py-20 lg:py-32">
      <div ref={ref} className="flex flex-col sm:flex-row justify-between gap-24 px-16 max-w-7xl mx-auto ">
      {isLeftVariant ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
      </div>
    </section>
  );
};

export default ImageText;
