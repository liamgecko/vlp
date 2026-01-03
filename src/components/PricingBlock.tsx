"use client";

import React from "react";
import { motion } from "framer-motion";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

interface CustomPricing {
  customPricingHeading?: string;
  customPricingContent?: string;
  customPricingButton?: {
    url: string;
    title: string;
    target?: string;
  };
}

interface PricingBlockProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  tiers?: PricingTier[];
  customPricing?: CustomPricing;
  className?: string;
}

const PricingBlock: React.FC<PricingBlockProps> = ({
  title = "Choose the right plan for you",
  description = "Choose an affordable plan that's packed with everything you need for your perfect wedding day.",
  tiers = [
    {
      id: "half-day",
      name: "Half Day",
      price: "£800",
      period: "per wedding",
      description: "Perfect for intimate ceremonies and smaller celebrations.",
      features: [
        "4 hours coverage",
        "Up to 200 edited photos",
        "Online gallery",
        "USB with high-res images",
        "Pre-wedding consultation",
        "Same-day preview"
      ],
      buttonText: "Book half day",
      buttonLink: "/contact"
    },
    {
      id: "full-day",
      name: "Full Day",
      price: "£1,200",
      period: "per wedding",
      description: "Complete coverage from morning prep to first dance.",
      features: [
        "8+ hours coverage",
        "Up to 400 edited photos",
        "Online gallery",
        "USB with high-res images",
        "Pre-wedding consultation",
        "Same-day preview",
        "Engagement shoot included",
        "Print release"
      ],
      buttonText: "Book full day",
      buttonLink: "/contact"
    }
  ],
  customPricing,
  className = ""
}) => {
  return (
    <section id="pricing-table" className={`pricing-block relative isolate px-6 py-12 sm:py-24 lg:px-0 ${className || 'bg-white'}`}>
      
      {/* Header */}
      <div className="pricing-block-header max-w-4xl mx-auto px-6 lg:px-0 sm:text-center text-left">
        <motion.h2 
          className="font-heading text-3xl md:text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {title}
        </motion.h2>
      
        <motion.div 
          className="font-sans text-md mt-4 text-primary w-full max-w-2xl mx-auto prose prose-p:max-w-none text-pretty"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          dangerouslySetInnerHTML={{ __html: description }}
        />

      </div>
      
      {/* Pricing Cards */}
      <div className="pricing-block-cards mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-2">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            className="relative bg-white p-8 shadow-lg rounded-2xl sm:p-10 flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blush-800 mb-2">{tier.name}</h3>
              
              {tier.price && (
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-primary">{tier.price}</span>
                  {tier.period && (
                    <span className="text-base text-[#554d77]">{tier.period}</span>
                  )}
                </p>
              )}
              
              {tier.description && (
                <div 
                  className="mt-4 text-base text-[#554d77] prose max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: tier.description }}
                />
              )}
              
              {tier.features && tier.features.length > 0 && (
                <ul role="list" className="mt-6 space-y-2 text-sm text-[#554d77]">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-x-3">
                      <svg 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        aria-hidden="true" 
                        className="h-5 w-5 flex-none text-blush-600 mt-0.5"
                      >
                        <path 
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" 
                          clipRule="evenodd" 
                          fillRule="evenodd" 
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <a
              href={tier.buttonLink}
              aria-describedby={tier.id}
              className="mt-8 block w-full px-6 py-3.5 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-center bg-blush-300 text-primary hover:bg-blush-400 focus-visible:ring-blush-300 focus-visible:ring-offset-white"
            >
              {tier.buttonText}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Custom Pricing Section */}
      {customPricing && (
        <motion.div 
          className="pricing-block-custom-pricing mt-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {customPricing.customPricingHeading && (
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {customPricing.customPricingHeading}
            </h3>
          )}
          
          {customPricing.customPricingContent && (
            <div 
              className="font-sans text-md prose max-w-none text-pretty"
              dangerouslySetInnerHTML={{ __html: customPricing.customPricingContent }}
            />
          )}
          
          {customPricing.customPricingButton && (
            <div className="mt-8">
              <a
                href={customPricing.customPricingButton.url}
                target={customPricing.customPricingButton.target || '_self'}
                className="btn-link bg-transparent border-2 border-midnight-950 text-midnight-950 px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-midnight-950/5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-midnight-950 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-900 inline-block"
              >
                {customPricing.customPricingButton.title}
              </a>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default PricingBlock;
