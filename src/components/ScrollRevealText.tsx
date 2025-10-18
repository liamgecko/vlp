"use client";

import React, { useRef } from "react";
import { motion, MotionStyle, useScroll, useTransform, MotionValue } from "framer-motion";

interface TestimonialSectionProps {
  heading: string;
  author?: string;
  backgroundImage?: string;
  className?: string;
}

// Individual word component that can use its own useTransform hook
const AnimatedWord = ({ word, index, totalWords, scrollYProgress }: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const wordStart = index / totalWords * 0.8;
  const wordEnd = (index + 1) / totalWords * 0.8;
  const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.25, 1]);

  return (
    <motion.span className="inline-block" style={{ opacity } as MotionStyle}>
      {word}
    </motion.span>
  );
};

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  heading,
  author = "— Sarah & James",
  backgroundImage = "/vlp-01.jpg",
  className = ""
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  });

  const words = heading.split(" ");

  return (
    <section 
      className={`scroll-reveal-text-block overflow-hidden px-16 md:px-[5%] py-16 md:py-24 lg:py-42 bg-cover bg-center bg-no-repeat relative ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[rgba(255,164,155,0.4)] via-[rgba(106,77,127,0.64)] via-40% to-[rgba(0,0,0,0.64)] z-10"></div>
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <h3 ref={headingRef} className="text-5xl font-semibold font-heading text-sunflower-50">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <AnimatedWord
                word={word}
                index={index}
                totalWords={words.length}
                scrollYProgress={scrollYProgress}
              />
              {index < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h3>
        {author && (
          <div className="mt-8 text-left">
            <p className="text-md font-medium text-sunflower-50 uppercase tracking-widest">{author}</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Legacy export for backward compatibility
export const Layout484 = TestimonialSection;
export type Layout484Props = TestimonialSectionProps;
