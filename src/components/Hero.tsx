"use client";
import Image from "next/image";
import type { FC } from "react";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";

interface HeroProps {
  backgroundImage?: {
    src: string;
    alt: string;
  };
  subtitle?: string;
  heading?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonAriaLabel?: string;
  className?: string;
}

const Hero: FC<HeroProps> = ({
  backgroundImage = {
    src: "/vlp-01.jpg",
    alt: "Victoria Photography Hero"
  },
  subtitle = "Wedding photography in scotland",
  heading = "When you're not just mouth happy, you're eyeball happy!",
  buttonText = "Save the date",
  buttonLink = "#",
  buttonAriaLabel,
  className = ""
}) => (
  <section className={`w-full max-w-[1920px] mx-auto flex justify-center p-4 pt-0 h-[calc(100vh-92px)] ${className}`}>
    <div className="relative w-full h-full">
      <Image
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        fill
        priority
        className="object-cover object-center rounded-xl"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 z-20">
        <div className="w-full max-w-2xl mx-auto">
          <SplitText className="!font-sans uppercase tracking-widest text-white text-sm md:text-base font-medium mb-2">
            {subtitle}
          </SplitText>
          <SplitText className="font-heading text-white text-3xl md:text-5xl font-bold leading-[1.2]">
            {heading}
          </SplitText>
          <motion.a
            href={buttonLink}
            className="bg-white text-slate-950 px-6 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 mt-8 inline-block"
            aria-label={buttonAriaLabel || buttonText}
            tabIndex={0}  
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ delay: 2, duration: 0.6, ease: "easeIn" }}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* handle click here if needed */ } }}
          >
            {buttonText}
          </motion.a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 