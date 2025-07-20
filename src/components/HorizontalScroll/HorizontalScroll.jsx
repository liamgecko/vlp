"use client";

import React from "react";
import "./HorizontalScroll.css";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageContainer from "./ImageContainer";

const images = {
  one: "/vlp-01.jpg",
  two: "/vlp-02.jpg", 
  three: "/vlp-03.jpg"
};

const HorizontalScroll = () => {

    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66667%"]);

    return (
        <div className="carousel" ref={targetRef}>
            <div className="contentContainer">
                <motion.div className="images bg-slate-950" style={{ x }}>
                    <motion.div 
                        className="imageItem"
                        initial={{ opacity: 0, y: 150 }}
                        whileInView={{ opacity: 1, y: 0, threshold: 0.99 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <ImageContainer 
                            imageSource={images.one} 
                            description="The Bold"
                            heading="Unique wedding photogprahy for..."
                            link="https://www.google.com"
                            linkText="View my pricing"
                        />
                    </motion.div>
                    <motion.div 
                        className="imageItem"
                        initial={{ opacity: 0, y: 150 }}
                        whileInView={{ opacity: 1, y: 0, threshold: 0.99 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <ImageContainer 
                            imageSource={images.two} 
                            description="The Colourful"
                            heading="Unique wedding photogprahy for..."
                            link="https://www.google.com"
                            linkText="View my work"
                        />
                    </motion.div>
                    <motion.div 
                        className="imageItem"
                        initial={{ opacity: 0, y: 150 }}
                        whileInView={{ opacity: 1, y: 0, threshold: 0.99 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <ImageContainer 
                            imageSource={images.three} 
                            description="The Creative"
                            heading="Unique wedding photogprahy for..."
                            link="https://www.google.com"
                            linkText="Save the date"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HorizontalScroll;