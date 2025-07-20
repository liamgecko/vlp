"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollSections = () => {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  return (
    <div>
      <section ref={introRef} className="w-full py-24 bg-slate-950 text-white pb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="font-heading text-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            So, you want something different?
          </motion.h2>
          <motion.p 
            className="font-sans text-lg mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            I&apos;m a Scottish wedding photographer for couples who want something different.
          </motion.p>
        </div>
      </section>
      <div className="relative">
        <section className="sticky top-0 h-screen bg-slate-950 flex flex-col items-center justify-center z-10">
          <div className="w-full p-6 mx-auto">
            <Image 
              src="/vlp-01.jpg" 
              alt="Wedding Photography" 
              width={1920} 
              height={1080} 
              className="w-full h-[calc(100vh-48px)] object-cover rounded-2xl"
            />
            <div className="text-center absolute inset-0 bg-slate-950/50">
              <div className="w-full h-full max-w-4xl mx-auto flex items-center justify-center flex-col px-8">
                <motion.h2 
                  className="font-heading text-5xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  For the bold and the creative
                </motion.h2>
                <motion.p 
                  className="font-sans text-lg text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  From intimate elopements to grand celebrations, I&apos;m here to document your love story with creativity, passion, and a touch of artistic flair.
                </motion.p>
                <motion.a 
                  href="/contact" 
                  className="bg-white text-slate-950 px-6 py-4 mt-8 uppercase font-semibold tracking-widest rounded-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Book me
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-0 h-screen bg-slate-950 flex flex-col items-center justify-center z-20">
          <div className="w-full p-6 mx-auto">
            <Image 
              src="/vlp-03.jpg" 
              alt="Natural Photography" 
              width={1920} 
              height={1080} 
              className="w-full h-[calc(100vh-48px)] object-cover rounded-2xl"
            />
            <div className="text-center absolute inset-0 bg-slate-950/50">
              <div className="w-full h-full max-w-4xl mx-auto flex items-center justify-center flex-col px-8">
                <motion.h2 
                  className="font-heading text-5xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  For the bold and the creative
                </motion.h2>
                <motion.p 
                  className="font-sans text-lg text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  My approach is documentary-style photography that captures the real moments. No forced poses, just authentic emotions and genuine connections.
                </motion.p>
                <motion.a 
                  href="/contact" 
                  className="bg-white text-slate-950 px-6 py-4 mt-8 uppercase font-semibold tracking-widest rounded-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Book me
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-0 h-screen bg-slate-950 flex flex-col items-center justify-center z-30">
          <div className="w-full p-6 mx-auto">
            <Image 
              src="/vlp-05.jpg" 
              alt="Artistic Photography" 
              width={1920} 
              height={1080} 
              className="w-full h-[calc(100vh-48px)] object-cover rounded-2xl"
            />
            <div className="text-center absolute inset-0 bg-slate-950/50">
              <div className="w-full h-full max-w-4xl mx-auto flex items-center justify-center flex-col px-8">
                <motion.h2 
                  className="font-heading text-5xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  For the bold and the creative
                </motion.h2>
                <motion.p 
                  className="font-sans text-lg text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  From intimate elopements to grand celebrations, I&apos;m here to document your love story with creativity, passion, and a touch of artistic flair.
                </motion.p>
                <motion.a 
                  href="/contact" 
                  className="bg-white text-slate-950 px-6 py-4 mt-8 uppercase font-semibold tracking-widest rounded-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Book me
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScrollSections; 