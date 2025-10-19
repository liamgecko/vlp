"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
}

interface GalleryProps {
  id?: string;
  images: GalleryImage[];
  title?: string;
  description?: string;
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({
  images = [],
  title = "Gallery",
  description = "Beautiful moments captured",
  className = ""
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = images.map(image => ({
    src: image.src,
    alt: image.alt,
    title: image.title || image.alt
  }));

  return (
    <section id="portfolio-gallery" className={`gallery-block w-full py-20 lg:py-32 ${className || 'bg-[#FFF4EB]'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto px-8 lg:px-0 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
          <div 
            className="font-sans text-md text-[#554d77] max-w-2xl mx-auto prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>

        {/* Masonry Gallery */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <svg 
                        className="w-6 h-6 text-primary" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          on={{
            view: ({ index }) => setLightboxIndex(index),
          }}
        />
      </div>
    </section>
  );
};

export default Gallery;
