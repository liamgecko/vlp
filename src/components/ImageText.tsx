"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ImageTextProps {
  id?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  videoUrl?: string;
  images?: Array<{ src: string; alt: string }>;
  variant: "left" | "right";
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  blockColourClass?: string;
}

const ImageText = ({ id, title, description, imageSrc, imageAlt, videoUrl, images, variant, buttonText, buttonLink, className, blockColourClass }: ImageTextProps) => {
  const isLeftVariant = variant === "left";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Ensure consistent initial state for hydration
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  
  
  const textContent = (
    <motion.div 
      className="flex flex-col gap-8 w-full md:w-1/2"
      initial={{ opacity: 0, x: isLeftVariant ? 50 : -50 }}
      animate={mounted && isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeftVariant ? 50 : -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-left text-balance">
        {title}
      </h2>          
      <div 
        className="font-sans text-base text-left mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {buttonText && (
        <a
          href={buttonLink || "#"}
          className="btn-link bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blush-900 w-fit"
          aria-label={buttonText}
        >
          {buttonText}
        </a>
      )}
    </motion.div>
  );

  const imageContent = (
    <motion.div 
      className="image-text-block-image flex flex-col gap-8 w-full md:w-1/2 relative after:content-[''] after:absolute after:w-full after:aspect-[4/3] after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-4 after:top-4 after:rounded-2xl"
      initial={{ opacity: 0, x: isLeftVariant ? -50 : 50 }}
      animate={mounted && isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeftVariant ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      {videoUrl ? (
        <div className="rounded-2xl w-full max-h-[90vh] relative z-10 aspect-[4/3] overflow-hidden">
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Video content'}
          />
        </div>
      ) : images && images.length > 0 ? (
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
          width={800} 
          height={600} 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-2xl w-full max-h-[90vh] object-cover relative z-10 aspect-[4/3]" 
        />
      ) : null}
    </motion.div>
  );

  return (
    <section id={id} ref={ref} className={`image-text-block w-full py-16 lg:py-24 ${blockColourClass || className || 'bg-sunflower-50'}`}>
      <div ref={ref} className="flex flex-col md:flex-row justify-between md:gap-24 gap-16 px-6 max-w-7xl mx-auto">
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
