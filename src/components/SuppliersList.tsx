"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SupplierModal from "./SupplierModal";

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

  return (
    <>
      <div id="supplier-list" className={`suppliers-list-block w-full ${className}`}>
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
      </div>

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

export default SuppliersList;
