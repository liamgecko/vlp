"use client";

import React, { useRef } from "react";
import { motion, MotionStyle, useScroll, useTransform, MotionValue } from "framer-motion";

type Props = {
  heading: string;
};

export type Layout484Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

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

export const Layout484 = (props: Layout484Props) => {
  const { heading } = {
    ...Layout484Defaults,
    ...props,
  };

  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  });

  const words = heading.split(" ");

  return (
    <section 
      className="overflow-hidden px-16 md:px-[5%] py-16 md:py-24 lg:py-42 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/vlp-01.jpg')"
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <h3 ref={headingRef} className="text-5xl font-semibold font-heading text-white">
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
        <div className="mt-8 text-left">
          <p className="text-xl font-medium text-white/80">— Sarah & James</p>
        </div>
      </div>
    </section>
  );
};

export const Layout484Defaults: Props = {
  heading:
    "We couldn't recommend or thank her enough for her amazing work that she does! From making us feel super comfortable in front of the camera and putting up with our awkwardness, everyone who has seen the photos have thought they were amazing. ",
};
