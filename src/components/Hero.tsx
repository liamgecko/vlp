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
  primaryButton?: {
    text: string;
    link: string;
    ariaLabel?: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
    ariaLabel?: string;
  };
  showSecondaryButton?: boolean;
  className?: string;
}

const Hero: FC<HeroProps> = ({
  backgroundImage = {
    src: "/vlp-01.jpg",
    alt: "Victoria Photography Hero"
  },
  subtitle = "Wedding photography in scotland",
  heading = "When you're not just mouth happy, you're eyeball happy!",
  primaryButton = {
    text: "Book a free consultation",
    link: "/contact",
    ariaLabel: "Book a free consultation"
  },
  secondaryButton = {
    text: "View my photography",
    link: "/photography",
    ariaLabel: "View my photography"
  },
  showSecondaryButton = true,
  className = ""
}) => (
  <section className={`w-full max-w-[1660px] mx-auto flex justify-center p-8 pt-0 h-[calc(100vh-92px)] ${className}`}>
    <div className="relative w-full h-full">
      <Image
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        fill
        priority
        className="object-cover object-center rounded-xl"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-80 bg-gradient-to-b from-[#0C091A]/0 to-[#0C091A]/100 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 z-20">
        <div className="w-full max-w-2xl mx-auto">
          <SplitText className="!font-sans uppercase tracking-widest text-white text-sm md:text-base font-semibold mb-2">
            {subtitle}
          </SplitText>
          <SplitText className="font-heading text-sunflower-50 text-3xl md:text-5xl font-bold leading-[1.2]">
            {heading}
          </SplitText>
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.a
              href={primaryButton.link}
              className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 focus:ring-offset-blush-900 inline-block"
              aria-label={primaryButton.ariaLabel}
              tabIndex={0}  
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              transition={{ delay: 2, duration: 0.6, ease: "easeIn" }}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* handle click here if needed */ } }}
            >
              {primaryButton.text}
            </motion.a>
            {showSecondaryButton && (
              <motion.a
                href={secondaryButton.link}
                className="bg-transparent border-2 border-sunflower-100 text-sunflower-100 px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-sunflower-100/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sunflower-100 focus:ring-offset-2 focus:ring-offset-violet-900 inline-block"
                aria-label={secondaryButton.ariaLabel}
                tabIndex={0}  
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ delay: 2.2, duration: 0.6, ease: "easeIn" }}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* handle click here if needed */ } }}
              >
                {secondaryButton.text}
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 