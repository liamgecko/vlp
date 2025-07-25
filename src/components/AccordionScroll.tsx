"use client";

import clsx from "clsx";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ImageProps = {
  src: string;
  alt?: string;
};

type Anchor = {
  url: string;
  number: string;
  title: string;
};

type Feature = {
  anchor: Anchor;
  tagline: string;
  heading: string;
  description: string;
  image: ImageProps;
};

type Props = {
  features: Feature[];
};

export type Layout357Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout357 = (props: Layout357Props) => {
  const { features } = {
    ...Layout357Defaults,
    ...props,
  };
  return (
    <section>
      <div className="bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center py-24">
          <motion.h2 
            className="font-heading text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Accordion scroll heading.
          </motion.h2>
          <motion.p 
            className="font-sans text-lg mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Accordion scroll description.
          </motion.p>
        </div>
      </div>
      <div className="sticky top-0">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <div className="relative -top-32 h-0" />
            <div
              className={clsx(
                "relative border-t border-white/20 bg-slate-950 pb-8 md:pb-14 lg:sticky lg:pb-0",
                { "top-0": index === 0 },
                { "lg:top-16": index === 1 },
                { "lg:top-32": index === 2 },
                { "lg:top-0": index === 3 },
              )}
            >
              <FeatureCard {...feature} index={index} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const FeatureCard = (feature: Feature & { index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, y }}
      className="px-[5%]"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <a href={feature.anchor.url} className="flex h-16 w-full items-center font-sans">
          <span className="mr-5 font-semibold md:mr-6 md:text-md text-white">{feature.anchor.number}</span>
          <h3 className="font-semibold md:text-md !font-sans uppercase text-white">{feature.anchor.title}</h3>
        </a>
        <div className={clsx(
                "py-8 md:py-10 lg:py-12 flex items-center",
                { "lg:h-[calc(100vh-64px)]": feature.index === 0 },
                { "lg:h-[calc(100vh-128px)]": feature.index === 1 },
                { "lg:h-[calc(100vh-192px)]": feature.index === 2 },
                { "lg:h-[calc(100vh-256px)]": feature.index === 3 },
              )}
              >
          <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20 w-full">
            <div>
              <h2 className="rb-5 mb-5 font-heading text-3xl md:mb-6 text-white">
                {feature.heading}
              </h2>
              <p className="md:text-md text-white">{feature.description}</p>
            </div>
            <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-white after:left-4 after:top-4 after:rounded-2xl">
              <Image
                src={feature.image.src}
                alt={feature.image.alt || ""}
                width={1600}
                height={600}
                className="h-[25rem] w-full object-cover sm:h-[30rem] lg:h-[60vh] rounded-2xl relative z-10"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Layout357Defaults: Props = {
  features: [
    {
      anchor: {
        url: "#",
        number: "01",
        title: "It starts before your big day!",
      },
      tagline: "Pre-wedding",
      heading: "I'll meet you for a coffee to get to know you",
      description:
        "I'll meet you for a coffee to get to know you. I'll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I'll also show you my portfolio and answer any questions you have.",
      
      image: {
        src: "/vlp-01.jpg",
        alt: "Natural wedding photography capturing genuine moments",
      },
    },
    {
      anchor: {
        url: "#",
        number: "02",
        title: "It's finally here!",
      },
      tagline: "On the day",
      heading: "Pre-nuptial photoshoot",
      description:
        "I'll meet you for a coffee to get to know you. I'll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I'll also show you my portfolio and answer any questions you have.",
      image: {
        src: "/vlp-02.jpg",
        alt: "Wedding photography with stunning Scottish landscapes",
      },
    },
    {
      anchor: {
        url: "#",
        number: "03",
        title: "Time to say 'I do'",
      },
      tagline: "Your wedding day",
      heading: "I'll be there to capture your special day",
      description:
        "Your wedding photos should be more than just snapshots - they should be works of art. I combine technical expertise with creative vision to create images that are both beautiful and meaningful. From composition and lighting to post-processing, every detail is carefully considered.",
      image: {
        src: "/vlp-03.jpg",
        alt: "Artistic wedding photography with creative vision",
      },
    },
    {
      anchor: {
        url: "#",
        number: "04",
        title: "Now it's time to relax (or let your hair down)",
      },
      tagline: "Dinner and dancing",
      heading: "I'll be there to capture your special day",
      description:
        "I'm not just there to take photos - I'm there to be part of your wedding experience. I'll help you feel comfortable, guide you through the day, and ensure you have fun while creating beautiful memories. Your wedding day should be enjoyable, not stressful, and I'm here to make that happen.",
      image: {
        src: "/vlp-04.jpg",
        alt: "Personal wedding photography experience",
      },
    },
  ],
};
