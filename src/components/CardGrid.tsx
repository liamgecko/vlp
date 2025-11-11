"use client";

import React from "react";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  category: string;
  slug: string;
}

interface CardGridProps {
  posts?: BlogPost[];
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  showHeading?: boolean;
  showButton?: boolean;
  className?: string;
}

const CardGrid = ({ 
  posts = defaultPosts.slice(0, 4),
  heading = "Latest Weddings",
  description = "Discover the beautiful love stories I've had the privilege to capture. Each wedding is unique, and every couple has their own special story to tell.",
  buttonText = "View All Weddings",
  buttonLink = "/weddings",
  showHeading = true,
  showButton = true,
  className = ""
}: CardGridProps) => {
  // Display all posts
  const displayPosts = posts;

  return (
    <div className={`card-grid-block w-full py-16 sm:py-24 ${className || 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        {showHeading && (
          <div className="mx-auto px-6 lg:px-0 sm:text-center text-left mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary mb-6">
              {heading}
            </h2>
            <div
              className="font-sans text-lg text-slate-600 max-w-2xl mx-auto prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <article 
              key={post.id} 
              className="group cursor-pointer"
            >
              <a href={`/weddings/${post.slug}`}>
                {/* Image Container */}
                <div className="relative mb-6">
                  <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-gradient-to-br after:from-[#FECBBE] after:to-[#FFA49B] after:left-2 after:top-2 after:rounded-2xl">
                    <Image
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-64 object-cover rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="font-medium">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-primary group-hover:text-slate-600 transition-colors duration-200">
                    {post.title.replace(/'/g, "&apos;")}
                  </h3>
                  
                  <p className="font-sans text-slate-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <span className="text-primary font-semibold hover:text-slate-600 transition-colors duration-200">
                    Read More &rarr;
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {showButton && (
          <div className="text-center mt-12">
            <a 
              href={buttonLink}
              className="bg-slate-950 text-white px-8 py-4 uppercase font-semibold tracking-widest rounded-full hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 inline-block"
              role="button"
              tabIndex={0}
              aria-label={buttonText}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* handle click here if needed */ } }}
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Default blog posts data
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Sarah & James - Edinburgh Castle Wedding",
    excerpt: "A magical winter wedding at Edinburgh Castle with stunning views of the city. Sarah and James celebrated their love with family and friends in this historic setting.",
    imageSrc: "/vlp-01.jpg",
    imageAlt: "Edinburgh Castle wedding photography",
    date: "December 2024",
    category: "Castle Wedding",
    slug: "sarah-james-edinburgh-castle"
  },
  {
    id: "2",
    title: "Emma & David - Highland Estate Celebration",
    excerpt: "A beautiful summer wedding in the Scottish Highlands. Emma and David chose a stunning estate surrounded by rolling hills and ancient forests for their special day.",
    imageSrc: "/vlp-02.jpg",
    imageAlt: "Highland estate wedding photography",
    date: "August 2024",
    category: "Highland Wedding",
    slug: "emma-david-highland-estate"
  },
  {
    id: "3",
    title: "Lucy & Michael - Coastal Beach Ceremony",
    excerpt: "A romantic beach wedding on the stunning Scottish coast. Lucy and Michael exchanged vows with the sound of waves and the beauty of the ocean as their backdrop.",
    imageSrc: "/vlp-03.jpg",
    imageAlt: "Coastal beach wedding photography",
    date: "July 2024",
    category: "Beach Wedding",
    slug: "lucy-michael-coastal-beach"
  },
  {
    id: "4",
    title: "Rachel & Tom - Rustic Barn Wedding",
    excerpt: "A charming rustic wedding in a beautifully restored barn. Rachel and Tom created a warm, intimate atmosphere perfect for celebrating their love with close family and friends.",
    imageSrc: "/vlp-04.jpg",
    imageAlt: "Rustic barn wedding photography",
    date: "June 2024",
    category: "Rustic Wedding",
    slug: "rachel-tom-rustic-barn"
  },
  {
    id: "5",
    title: "Hannah & Chris - Garden Party Wedding",
    excerpt: "An elegant garden party wedding filled with flowers and natural beauty. Hannah and Chris celebrated their love in a stunning garden setting with afternoon tea and champagne.",
    imageSrc: "/vlp-05.jpg",
    imageAlt: "Garden party wedding photography",
    date: "May 2024",
    category: "Garden Wedding",
    slug: "hannah-chris-garden-party"
  },
  {
    id: "6",
    title: "Sophie & Alex - City Hall Elopement",
    excerpt: "An intimate city hall elopement followed by a romantic dinner. Sophie and Alex chose to keep their wedding simple and personal, focusing on what mattered most - their love.",
    imageSrc: "/vlp-01.jpg",
    imageAlt: "City hall elopement photography",
    date: "April 2024",
    category: "Elopement",
    slug: "sophie-alex-city-hall"
  }
];

export default CardGrid; 