'use client';

import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
  containerClassName?: string;
  backgroundClassName?: string;
  showHeading?: boolean;
  heading?: string;
  description?: string;
}

const ImageSlider = ({ 
  images, 
  autoplay = true, 
  autoplayDelay = 5000, 
  showNavigation = true, 
  className = "",
  containerClassName = "w-full max-w-[1600px] mx-auto px-4",
  backgroundClassName = "w-full py-16 flex justify-center bg-slate-950",
  showHeading = true,
  heading = "Image slider heading.",
  description = "Image slider description."
}: ImageSliderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to update Swiper navigation when refs are ready
  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params &&
      swiperInstance.navigation &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation !== "boolean"
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={backgroundClassName}>
      <div className={containerClassName}>
        <div className={`overflow-hidden max-w-[1600px] mx-auto px-2 md:px-0 ${className}`}>
          {showHeading && (
            <div className="mb-16 text-center text-white">
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
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1.5}
            centeredSlides={true}
            navigation={showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false}
            pagination={false}
            autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
            loop={true}
            className="w-full h-full"
            onSwiper={setSwiperInstance}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="relative w-full h-[80vh] transition-all duration-300 ease-in-out">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="rounded-lg object-cover"
                    priority={index === 0}
                  />
                  {(image.title || image.description) && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white max-w-4xl mx-auto px-6">
                        {image.title && (
                          <h2 className="font-heading text-4xl font-bold mb-4">
                            {image.title}
                          </h2>
                        )}
                        {image.description && (
                          <p className="font-sans text-lg md:text-xl leading-relaxed">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Controls below slider, center aligned on small screens, right aligned on larger screens */}
          <div className="flex flex-row gap-2 mt-6 justify-center md:justify-end">
            <div ref={prevRef} className="w-11 h-11 flex items-center justify-center border border-white rounded-full cursor-pointer text-2xl select-none transition hover:bg-white/10 text-white">
              <ChevronLeft size={28} />
            </div>
            <div ref={nextRef} className="w-11 h-11 flex items-center justify-center border border-white rounded-full cursor-pointer text-2xl select-none transition hover:bg-white/10 text-white">
              <ChevronRight size={28} />
            </div>
          </div>
          
          {/* Custom navigation styles */}
          <style jsx global>{`
            .swiper-slide {
              transition: all 0.3s ease;
            }
            .swiper-slide-active {
              transform: scale(1) !important;
            }
            .swiper-slide-prev,
            .swiper-slide-next {
              opacity: 0.4;
              transform: scale(0.98) !important;
            }
            .swiper-pagination-bullet {
              background: #fff;
              opacity: 0.5;
              width: 10px;
              height: 10px;
              margin: 0 4px !important;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
              background: #fff;
              width: 14px;
              height: 14px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider; 