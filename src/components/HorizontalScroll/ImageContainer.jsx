import React from "react";
import "./ImageContainer.css";

const ImageContainer = ({ imageSource, description, heading, linkText, link }) => {
    return (
        <div className="image-container relative">
            <img className="image" src={imageSource} alt="alt text goes here" />
            <div className="absolute inset-0 flex items-center justify-center flex-col bg-slate-950/50">
                <h3 className="font-sans text-white text-xl uppercase font-bold tracking-[8px] block mb-4">{heading}</h3>
                <p className="font-heading text-white text-8xl">{description}</p>
                <a href={link} as="button" className="bg-white text-slate-950 px-6 py-4 mt-8 uppercase font-semibold tracking-widest rounded-full">{linkText}</a>
            </div>
        </div>
    );
};

export default ImageContainer;