"use client";
import { motion, easeInOut } from "framer-motion";
import type { FC } from "react";

type SplitTextProps = {
  children: string;
  className?: string;
};

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.01 * i },
  }),
};

const child = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

const SplitText: FC<SplitTextProps> = ({ children, className }) => {
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={children}
      style={{ display: "inline-block" }}
    >
      {children.split(" ").map((word, idx) => (
        <span key={idx} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {word.split("").map((char, i) => (
            <motion.span
              variants={child}
              style={{ display: "inline-block" }}
              key={i}
            >
              {char}
            </motion.span>
          ))}
          {" "}
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText; 