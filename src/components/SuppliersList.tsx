"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

interface SuppliersListProps {
  suppliers?: Supplier[];
  className?: string;
}

const SuppliersList: React.FC<SuppliersListProps> = ({
  suppliers = [],
  className = ""
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSupplierClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  return (
    <>
      <section className={`suppliers-list-block w-full ${className}`}>
        <div className="container mx-auto px-4">

          {/* Suppliers Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {suppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                viewport={{ once: true }}
                onClick={() => handleSupplierClick(supplier)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-2 after:top-2 after:rounded-2xl">
                    <Image
                      src={supplier.image}
                      alt={supplier.imageAlt}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay tint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/0 to-midnight-950/80 group-hover:bg-midnight-950/50 rounded-2xl z-20 transition-all duration-300"></div>
                  </div>
                  
                  {/* Content positioned at bottom left - animates to top on hover */}
                  <div className="absolute bottom-4 left-4 group-hover:-translate-y-8 z-30 transition-transform duration-500 ease-out">
                    <p className="text-sunflower-100 font-semibold text-xs uppercase tracking-wider drop-shadow-lg mb-0">
                      {supplier.category}
                    </p>
                    
                    <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg">
                      {supplier.name}
                    </h3>
                  </div>
                  
                  {/* "Find out more" span at bottom on hover */}
                  <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-white font-semibold text-sm drop-shadow-lg">
                      Find out more
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedSupplier && (
        <SupplierModal 
          supplier={selectedSupplier} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

// Modal Component
interface SupplierModalProps {
  supplier: Supplier;
  isOpen: boolean;
  onClose: () => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ supplier, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
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
              <p className="text-xs text-blush-600 font-semibold uppercase tracking-wider">
                {supplier.category}
              </p>
              
              {/* Title */}
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6" id="modal-title">
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
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: supplier.description }}
              />
              
            </div>

            {/* Modal footer - fixed at bottom */}
            {supplier.website && (
              <div className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6 flex-shrink-0">
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
};

export default SuppliersList;
