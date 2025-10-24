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
  itemColour?: string | string[];
}

interface ImageTextCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  heading?: string;
  description?: string;
  showHeading?: boolean;
  blockColourClass?: string;
}

const ImageTextCarousel = ({ 
  slides, 
  autoplay = true, 
  autoplayDelay = 5000, 
  showNavigation = true,
  heading = "Carousel heading.",
  description = "Carousel description.",
  showHeading = true,
  blockColourClass
}: ImageTextCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Map item colour to CSS class
  const getItemColourClass = (itemColour?: string | string[]) => {
    if (!itemColour) return 'bg-blush-300';
    
    // Handle array case (ACF sometimes returns arrays)
    const colourValue = Array.isArray(itemColour) ? itemColour[0] : itemColour;
    
    const colourMap: Record<string, string> = {
      'sunflower_solid': 'block-sunflower-solid',
      'sunflower_gradient': 'block-sunflower-gradient',
      'peach_solid': 'block-peach-solid',
      'peach_gradient': 'block-peach-gradient',
      'blush_solid': 'block-blush-solid',
      'blush_gradient': 'block-blush-gradient',
      'violet_solid': 'block-violet-solid',
      'violet_gradient': 'block-violet-gradient',
      'midnight_solid': 'block-midnight-solid',
      'midnight_gradient': 'block-midnight-gradient',
    };
    
    return colourMap[colourValue] || 'bg-blush-300';
  };

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
    <section className={`text-carousel-block w-full py-16 sm:py-24 ${blockColourClass || 'bg-sunflower-100'}`}>
        {showHeading && (
          <div className="max-w-4xl mx-auto px-6 lg:px-0 sm:text-center text-left mb-12">
              <motion.h2 
                className="font-heading text-3xl md:text-4xl text-primary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {heading}
              </motion.h2>
              <motion.div 
                className="font-sans text-md mt-4 text-[#554d77] text-balance prose max-w-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
          </div>
        )}
      <div className="w-full max-w-7xl mx-auto px-6 text-center lg:px-16">
        {/* Carousel Container */}
        <div className="text-carousel-block-container relative w-full max-w-7xl mx-auto">
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
                  <div className={`w-full lg:w-1/2 ${getItemColourClass(slide.itemColour)} p-8 lg:p-12 flex flex-col justify-center text-left prose`}>
                    <h3 className="font-heading text-3xl font-bold mb-2">
                      {slide.title}
                    </h3>
                    <div 
                      className="font-sans text-blush-900 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    />
                    {slide.buttonText && (
                      <a
                        href="#"
                        onClick={() => handleClick(slide.buttonLink)}
                        className="bg-white text-slate-950 px-6 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 w-fit mt-8"
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

        {/* Controls below carousel, center aligned */}
        {showNavigation && slides.length > 1 && (
          <div className="embla-controls flex flex-row gap-2 mt-6 justify-center">
            <button
              onClick={goToPrevious}
              className="w-11 h-11 flex items-center justify-center border border-[#554D77] rounded-full cursor-pointer text-2xl select-none transition hover:bg-[#554D77]/10 text-[#554D77]"
              aria-label="Previous slide"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-11 h-11 flex items-center justify-center border border-[#554D77] rounded-full cursor-pointer text-2xl select-none transition hover:bg-[#554D77]/10 text-[#554D77]"
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