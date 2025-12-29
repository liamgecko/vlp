"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl h-[100vh] max-h-[100vh] sm:max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
          <DialogTitle className="font-heading text-2xl font-bold text-midnight-950">
            {supplier.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-blush-600 font-semibold uppercase tracking-wider">
            {supplier.category}
          </DialogDescription>
        </DialogHeader>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 space-y-6">
          {/* Image */}
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src={supplier.image}
              alt={supplier.imageAlt}
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full h-auto"
            />
          </div>
          
          {/* Descriptive text */}
          <div 
            className="prose max-w-none text-midnight-950"
            dangerouslySetInnerHTML={{ __html: supplier.description }}
          />
        </div>
        
        {/* Fixed footer */}
        {supplier.website && (
          <div className="px-6 py-4 border-t border-slate-200 flex-shrink-0 bg-white">
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
      </DialogContent>
    </Dialog>
  );
};

export default SupplierModal;