"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import SupplierModal from "./SupplierModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract unique categories from suppliers
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(suppliers.map(supplier => supplier.category)));
    return ["all", ...uniqueCategories];
  }, [suppliers]);

  // Filter suppliers based on selected category
  const filteredSuppliers = useMemo(() => {
    if (selectedCategory === "all") {
      return suppliers;
    }
    return suppliers.filter(supplier => supplier.category === selectedCategory);
  }, [suppliers, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setIsAnimating(true);
    setSelectedCategory(category);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

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
      <div className={`suppliers-list-block w-full ${className}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Category Filter */}
          <div className="mb-8">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:max-w-sm max-w-full bg-white border-slate-200 focus:border-slate-300 focus:ring-slate-300">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Suppliers Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {filteredSuppliers.map((supplier, index) => (
              <div
                key={supplier.id}
                className={`group cursor-pointer transform transition-all duration-500 ease-out ${
                  isAnimating 
                    ? 'opacity-0 translate-y-4 scale-95' 
                    : 'opacity-100 translate-y-0 scale-100'
                }`}
                style={{
                  transitionDelay: isAnimating ? '0ms' : `${index * 50}ms`
                }}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto md:h-64 object-cover rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
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
              </div>
            ))}
          </div>
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
