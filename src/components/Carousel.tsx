"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import EmblaCarousel from '@/components/ImageSlider/emblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';

interface CarouselSlide {
  src: string;
  alt: string;
}

interface CarouselSectionProps {
  title: string;
  description: string;
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  className?: string;
  blockColourClass?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  description,
  slides,
  options = { dragFree: true, loop: true },
  className = "",
  blockColourClass
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={`carousel-block w-full pt-20 pb-24 ${blockColourClass || className || 'bg-[#FFF4EB]'}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-0">
        <motion.div 
          ref={ref}
          className="sm:text-center text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
            {title}
          </h2>
          <div 
            className="text-md text-[#554D77] max-w-2xl mx-auto mb-6 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <EmblaCarousel slides={slides} options={options} />
      </motion.div>
    </section>
  );
};

export default CarouselSection;
