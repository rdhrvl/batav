"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const getPlaceholder = (text: string) => 
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#E8E8E8"/><text x="50%" y="50%" font-family="sans-serif" font-weight="bold" font-size="32" fill="#A0A0A0" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`
  )}`;

const GALLERY_IMAGES = [
  { id: 1, src: getPlaceholder('Gallery Image 1'), alt: 'Coffee pouring', aspect: 'aspect-[3/4]' },
  { id: 2, src: getPlaceholder('Gallery Image 2'), alt: 'Cafe interior', aspect: 'aspect-[4/3]' },
  { id: 3, src: getPlaceholder('Gallery Image 3'), alt: 'Latte art', aspect: 'aspect-square' },
  { id: 4, src: getPlaceholder('Gallery Image 4'), alt: 'Industrial seating', aspect: 'aspect-[3/4]' },
  { id: 5, src: getPlaceholder('Gallery Image 5'), alt: 'Workspace', aspect: 'aspect-[4/3]' },
  { id: 6, src: getPlaceholder('Gallery Image 6'), alt: 'Food serving', aspect: 'aspect-square' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-primary text-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Galeri Batapav</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Jelajahi setiap sudut estetika industrial kami yang dirancang untuk kenyamanan maksimal.
          </p>
        </div>
        
        {/* CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img) => (
            <div 
              key={img.id} 
              className={`relative w-full overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-lg ${img.aspect}`}
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors bg-white/10 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Enlarged gallery image"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
