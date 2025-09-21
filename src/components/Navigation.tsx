"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/photography", label: "Photography" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About me" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Victoria Photography Home" tabIndex={0} className="flex items-center gap-2">
            <Image
              src="/vlp-logo.svg"
              alt="Victoria Photography Logo"
              width={208}
              height={52}
              priority
              className="w-full h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sans font-semibold text-primary text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 hover:bg-black/5 transition-all duration-200"
                aria-label={label}
                tabIndex={0}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile CTA Button and Menu */}
        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <a
            href="#"
            className="hidden sm:block rounded-full bg-blush-300 text-primary px-4 py-2.5 font-sans font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blush-300/50 focus:ring-offset-2 hover:bg-blush-300/80 transition cursor-pointer"
            aria-label="Save the date"
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* handle click here if needed */ } }}
          >
            Save the date
          </a>

          {/* Mobile Menu Button */}
          <a
            href="#"
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded"
            onClick={handleToggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleMenu(); } }}
          >
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-b from-midnight-950 to-slate-950 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button - Positioned same as hamburger */}
            <div className="w-full max-w-screen-xl lg:max-w-screen-2xl mx-auto flex items-center justify-between py-6 px-4">
              <div></div> {/* Empty div to maintain spacing */}
              <a
                href="#"
                className="flex justify-center items-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded relative"
                onClick={handleCloseMenu}
                aria-label="Close mobile menu"
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCloseMenu(); } }}
              >
                <span className="absolute block w-6 h-0.5 bg-sunflower-100 rotate-45"></span>
                <span className="absolute block w-6 h-0.5 bg-sunflower-100 -rotate-45"></span>
              </a>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col items-center justify-center min-h-screen px-6 -mt-16">
              {/* Logo */}
              <div className="mb-16">
                <Image
                  src="/vlp-logo-light.svg"
                  alt="Victoria Photography Logo"
                  width={208}
                  height={52}
                />
              </div>

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col items-center space-y-8 mb-16">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-heading font-medium text-sunflower-50 text-4xl focus:outline-none focus:underline hover:underline transition"
                      aria-label={label}
                      tabIndex={0}
                      onClick={handleCloseMenu}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA Button */}
              <a
                href="#"
                className="bg-blush-300 text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 focus:ring-offset-blush-900"
                aria-label="Book a free consultation"
                tabIndex={0}
                role="button"
                onClick={handleCloseMenu}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCloseMenu(); } }}
              >
                Book a free consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 