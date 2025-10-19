"use client";

import React from "react";
import { motion } from "framer-motion";

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  backgroundClassName?: string;
}

const CallToAction = ({ 
  title = "Ready to capture your special day?",
  description = "Let's create beautiful memories together. Get in touch to discuss your wedding photography needs and start planning your perfect day.",
  buttonText = "Get In Touch",
  buttonLink = "/contact",
}: CallToActionProps) => {
  const handleClick = () => {
    // Handle button click - could navigate to contact page or open contact form
    if (buttonLink && buttonLink !== "#") {
      window.location.href = buttonLink;
    }
  };

  return (
    <section className="call-to-action-block w-full py-24 bg-midnight-950 text-sunflower-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="font-heading text-4xl md:text-5xl font-bold mb-6 text-sunflower-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.div 
          className="font-sans max-w-2xl mx-auto text-sunflower-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <motion.a
          href={buttonLink}
          onClick={handleClick}
          className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blush-900 inline-block mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          role="button"
          tabIndex={0}
          aria-label="Contact: Get In Touch"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        >
          {buttonText}
        </motion.a>
      </div>
    </section>
  );
};

export default CallToAction;
