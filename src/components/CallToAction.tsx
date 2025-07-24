"use client";

import React from "react";
import { motion } from "framer-motion";

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CallToAction = ({ 
  title = "Ready to capture your special day?",
  description = "Let's create beautiful memories together. Get in touch to discuss your wedding photography needs and start planning your perfect day.",
  buttonText = "Get In Touch",
  buttonLink = "/contact"
}: CallToActionProps) => {
  const handleClick = () => {
    // Handle button click - could navigate to contact page or open contact form
    console.log("Contact button clicked");
  };

  return (
    <section className="w-full py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="font-heading text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="font-sans mb-8 max-w-2xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {description}
        </motion.p>
        <motion.a
          href="#"
          onClick={handleClick}
          className="bg-white text-slate-950 px-6 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
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
