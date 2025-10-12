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
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  description,
  slides,
  options = { dragFree: true, loop: true },
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={`w-full pt-20 pb-24 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
            {title}
          </h2>
          <p className="text-md text-[#554D77] max-w-2xl mx-auto mb-6">
            {description}
          </p>
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
