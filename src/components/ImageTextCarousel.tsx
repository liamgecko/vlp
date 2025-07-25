"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Slide {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

interface ImageTextCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  heading?: string;
  description?: string;
  showHeading?: boolean;
}

const ImageTextCarousel = ({ 
  slides, 
  autoplay = true, 
  autoplayDelay = 5000, 
  showNavigation = true,
  heading = "Carousel heading.",
  description = "Carousel description.",
  showHeading = true
}: ImageTextCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, slides.length]);

  const handleClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-white py-24">
        {showHeading && (
          <div className="container mx-auto px-4 text-center pb-16">
              <motion.h2 
                className="font-heading text-4xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {heading}
              </motion.h2>
              <motion.p 
                className="font-sans text-lg mt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {description}
              </motion.p>
          </div>
        )}
      <div className="w-full max-w-7xl mx-auto px-4 text-center pb-16 px-16">
        {/* Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Slides */}
          <div className="relative overflow-hidden rounded-2xl h-[600px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image Section - 50% */}
                  <div className="w-full lg:w-1/2 h-full relative">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content Box - 50% with dark background */}
                  <div className="w-full lg:w-1/2 bg-slate-950 text-white p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="font-heading text-3xl font-bold mb-2">
                      {slide.title}
                    </h3>
                    <p className="font-sans mb-8 text-white/90">
                      {slide.description}
                    </p>
                    {slide.buttonText && (
                      <a
                        href="#"
                        onClick={() => handleClick(slide.buttonLink)}
                        className="bg-white text-slate-950 px-6 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 w-fit"
                        role="button"
                        tabIndex={0}
                        aria-label={slide.buttonText}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(slide.buttonLink); } }}
                      >
                        {slide.buttonText}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Controls below carousel, center aligned on small screens, right aligned on larger screens */}
        {showNavigation && slides.length > 1 && (
          <div className="flex flex-row gap-2 mt-6 justify-center md:justify-end">
            <button
              onClick={goToPrevious}
              className="w-11 h-11 flex items-center justify-center border border-slate-950 rounded-full cursor-pointer text-2xl select-none transition hover:bg-slate-950/10 text-slate-950"
              aria-label="Previous slide"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-11 h-11 flex items-center justify-center border border-slate-950 rounded-full cursor-pointer text-2xl select-none transition hover:bg-slate-950/10 text-slate-950"
              aria-label="Next slide"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageTextCarousel; 