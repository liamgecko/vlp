"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroBlock } from "@/lib/wp";

interface HeroProps {
  heroData: HeroBlock;
}

const Hero = ({ heroData }: HeroProps) => {
  // Use heroData directly - all fields except image are optional
  const displayTitle = heroData.heroHeading;
  const displaySubtitle = heroData.heroSubHeading;
  const displayBackgroundImage = heroData.heroImage?.node?.sourceUrl || "/vlp-05.jpg"; // Only image has fallback
  const displayPrimaryButtonText = heroData.primaryButton?.primaryButtonLink?.title;
  const displayPrimaryButtonLink = heroData.primaryButton?.primaryButtonLink?.url;
  const displaySecondaryButtonText = heroData.secondaryButton?.secondaryButtonLink?.title;
  const displaySecondaryButtonLink = heroData.secondaryButton?.secondaryButtonLink?.url;
  return (
    <section className="hero-block w-full max-w-[1660px] mx-auto flex justify-center p-8 pt-0 h-[calc(100vh-92px)] min-h-[400px]">
      <div className="relative w-full h-full">
        <Image
          src={displayBackgroundImage}
          alt={heroData?.heroImage?.node?.altText || "Victoria Photography Hero - Beautiful wedding photography"}
          fill
          className="object-cover object-center rounded-xl"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-80 bg-gradient-to-b from-[#0C091A]/0 to-[#0C091A]/100 z-10" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 z-20">
          <div className="w-full max-w-2xl mx-auto">
            {displaySubtitle && (
              <motion.span
                className="!font-sans uppercase tracking-widest text-white text-sm md:text-base font-semibold mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {displaySubtitle}
              </motion.span>
            )}
            
            {displayTitle && (
              <motion.h1
                className="font-heading text-sunflower-50 text-3xl md:text-5xl font-bold leading-[1.2]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                {displayTitle}
              </motion.h1>
            )}

            {/* Buttons */}
            {(displayPrimaryButtonText || displaySecondaryButtonText) && (
              <motion.div
                className="flex items-center justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                {displayPrimaryButtonText && displayPrimaryButtonLink && (
                  <a
                    href={displayPrimaryButtonLink}
                    className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 focus:ring-offset-blush-900 inline-block"
                  >
                    {displayPrimaryButtonText}
                  </a>
                )}
                
                {displaySecondaryButtonText && displaySecondaryButtonLink && (
                  <a
                    href={displaySecondaryButtonLink}
                    className="bg-transparent border-2 border-sunflower-100 text-sunflower-100 px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-sunflower-100/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sunflower-100 focus:ring-offset-2 focus:ring-offset-violet-900 inline-block"
                  >
                    {displaySecondaryButtonText}
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;