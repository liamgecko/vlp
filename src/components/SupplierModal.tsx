"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface Supplier {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  location?: string;
  specialties?: string[];
}

interface SupplierModalProps {
  supplier: Supplier;
  isOpen: boolean;
  onClose: () => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ supplier, isOpen, onClose }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Add the modal-open class to body
      document.body.classList.add('modal-open');
      // Set the scroll position to prevent jumping
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Remove the modal-open class
      document.body.classList.remove('modal-open');
      // Get the scroll position from the top style
      const scrollY = document.body.style.top;
      // Reset the top style
      document.body.style.top = '';
      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Create portal to render modal outside of block CSS context
  const modalContent = (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-midnight-950/80 transition-opacity" onClick={onClose}></div>

      {/* Modal panel */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl flex flex-col md:max-h-[90vh] max-h-[96vh]">
            {/* Close button */}
            <div className="absolute right-4 top-4 z-10">
              <button
                type="button"
                className="rounded-md bg-white text-midnight-950 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2 hover:bg-slate-100 cursor-pointer p-1 transition-all duration-300"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal content - scrollable */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 overflow-y-auto flex-1">
              {/* Category */}
              <p className="text-xs !text-blush-600 font-semibold uppercase tracking-wider">
                {supplier.category}
              </p>
              
              {/* Title */}
              <h3 className="font-heading text-2xl font-bold !text-midnight-950 mb-6" id="modal-title">
                {supplier.name}
              </h3>
              
              {/* Image */}
              <div className="w-full rounded-lg overflow-hidden mb-6">
                <Image
                  src={supplier.image}
                  alt={supplier.imageAlt}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Descriptive text */}
              <div 
                className="prose max-w-none !text-midnight-950"
                dangerouslySetInnerHTML={{ __html: supplier.description }}
              />
              
            </div>

            {/* Modal footer - fixed at bottom */}
            {supplier.website && (
              <div className="bg-white border-t border-slate-200 px-4 py-4 sm:px-6 flex-shrink-0">
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-blush-600 hover:text-blush-700"
                >
                  Visit website
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body);
};

export default SupplierModal;
