"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextBlockProps {
  id?: string;
  content: string;
  className?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  id,
  content,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id={id} className={`text-block w-full py-16 lg:py-24 ${className || 'bg-sunflower-50'}`}>
      <div className="max-w-4xl mx-auto px-7 lg:px-0 ">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div 
            className="prose max-w-none prose-headings:text-primary prose-p:text-[#554d77] prose-a:text-primary prose-strong:text-primary"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TextBlock;