"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageTextProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  variant: "left" | "right";
  buttonText?: string;
  buttonLink?: string;
}

const ImageText = ({ title, description, imageSrc, imageAlt, variant, buttonText, buttonLink }: ImageTextProps) => {
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
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 text-left text-balance">
        {title}
      </h2>          
      <p className="font-sans text-base text-slate-900 text-left mt-8">
        {description}
      </p>
      {buttonText && (
        <button
          onClick={handleClick}
          className="bg-slate-950 text-white px-6 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 w-fit mt-8 border border-white"
        >
          {buttonText}
        </button>
      )}
    </motion.div>
  );

  const imageContent = (
    <motion.div 
      className="flex flex-col gap-4 w-full sm:w-1/2 relative after:content-[''] after:absolute after:w-full after:aspect-[4/3] after:bg-slate-950 after:left-4 after:top-4 after:rounded-2xl"
      initial={{ opacity: 0, x: isLeftVariant ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeftVariant ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        width={1920} 
        height={1080} 
        className="rounded-2xl w-full max-h-[90vh] object-cover relative z-10 aspect-[4/3]" 
      />
    </motion.div>
  );

  return (
    <section ref={ref} className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-24 py-20 lg:py-32 px-16">
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
    </section>
  );
};

export default ImageText;
