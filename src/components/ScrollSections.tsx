"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StickySection {
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

interface ScrollSectionsProps {
  introHeading?: string;
  introDescription?: string;
  sections?: StickySection[];
  className?: string;
}

const ScrollSections: React.FC<ScrollSectionsProps> = ({
  introHeading = "Sticky scroll sections heading.",
  introDescription = "Sticky scroll sections description.",
  sections = [
    {
      image: {
        src: "/vlp-01.jpg",
        alt: "Wedding Photography"
      },
      heading: "For the bold and the creative",
      description: "From intimate elopements to grand celebrations, I'm here to document your love story with creativity, passion, and a touch of artistic flair.",
      buttonText: "Book me",
      buttonLink: "/contact"
    },
    {
      image: {
        src: "/vlp-03.jpg",
        alt: "Natural Photography"
      },
      heading: "For the bold and the creative",
      description: "My approach is documentary-style photography that captures the real moments. No forced poses, just authentic emotions and genuine connections.",
      buttonText: "Book me",
      buttonLink: "/contact"
    },
    {
      image: {
        src: "/vlp-05.jpg",
        alt: "Artistic Photography"
      },
      heading: "For the bold and the creative",
      description: "From intimate elopements to grand celebrations, I'm here to document your love story with creativity, passion, and a touch of artistic flair.",
      buttonText: "Book me",
      buttonLink: "/contact"
    }
  ],
  className = ""
}) => {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  return (
    <div className={className}>
      <section ref={introRef} className="w-full pb-24 pb-0 text-primary pb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {introHeading}
          </motion.h2>
          <motion.p 
            className="font-sans text-md mt-4 text-[#554d77] w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {introDescription}
          </motion.p>
        </div>
      </section>
      <div className="relative">
        {sections.map((section, index) => (
          <section key={index} className={`sticky top-0 h-screen flex flex-col items-center justify-center ${
              index === 0 ? 'bg-gradient-to-b from-[#FFF4EB] to-[#FEEBD4]' :
              index === 1 ? 'bg-gradient-to-b from-[#FEEBD4] to-[#FECBBE]' :
              'bg-gradient-to-b from-[#FECBBE] to-[#FBB6AF]'
            }`} style={{ zIndex: 10 + index * 10 }}>
            <div className="w-full p-6 mx-auto">
              <div className="relative w-full h-[calc(100vh-48px)] rounded-2xl overflow-hidden">
                <Image 
                  src={section.image.src} 
                  alt={section.image.alt} 
                  width={1920} 
                  height={1080} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0C091A]/25 to-[#0C091A]/100 z-10" />
                <div className="text-center absolute inset-0 m-6 rounded-2xl z-20">
                  <div className="w-full h-full max-w-4xl mx-auto flex items-center justify-end flex-col px-8 relative bottom-20">
                  <motion.h2 
                    className="font-heading text-5xl md:text-6xl font-bold text-sunflower-50 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {section.heading}
                  </motion.h2>
                  <motion.p 
                    className="font-sans text-md text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {section.description}
                  </motion.p>
                  {section.buttonText && section.buttonLink && (
                    <motion.a 
                      href={section.buttonLink} 
                      className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 focus:ring-offset-blush-900 inline-block mt-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {section.buttonText}
                    </motion.a>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="h-24 bg-[#FBB6AF]"></div>
    </div>
  );
};

export default ScrollSections; 