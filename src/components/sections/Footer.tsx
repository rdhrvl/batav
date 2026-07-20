"use client";

import { useState } from 'react';
import { BUSINESS_INFO } from '@/lib/business-info';
import { MapPin, Phone, Clock, Copy, Check, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-primary text-white py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 grid md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand Column (Col 1-4) */}
        <div className="md:col-span-4">
          <h3 className="text-3xl font-bold font-poppins mb-6 text-accent tracking-tight">{BUSINESS_INFO.name}</h3>
          <p className="text-white/70 leading-relaxed mb-8">
            The Digital Gateway to South Jakarta's Warmest Modern-Industrial Hangout. Tempat sempurna untuk secangkir inspirasi.
          </p>
        </div>
        
        {/* Contact Info (Col 5-8) */}
        <div className="md:col-span-4">
          <h4 className="font-bold text-lg mb-6 tracking-wide">Informasi Kontak</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <div className="bg-white/10 p-2 rounded-lg shrink-0 group-hover:bg-accent transition-colors">
                <MapPin className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-white/80 leading-relaxed mb-2">{BUSINESS_INFO.address}</p>
                <div className="flex items-center gap-4 text-sm">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Tersalin!' : 'Salin Alamat'}
                  </button>
                  <a
                    href={BUSINESS_INFO.maps.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:text-white transition-colors"
                  >
                    Buka di Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="bg-white/10 p-2 rounded-lg shrink-0 group-hover:bg-accent transition-colors">
                <Phone className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
              </div>
              <span className="text-white/80">{BUSINESS_INFO.contact.display}</span>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="bg-white/10 p-2 rounded-lg shrink-0 group-hover:bg-accent transition-colors">
                <Clock className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
              </div>
              <span className="text-white/80">{BUSINESS_INFO.hours}</span>
            </li>
          </ul>
        </div>

        {/* Google Maps Embed (Col 9-12) */}
        <div className="md:col-span-4">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg tracking-wide">Lokasi Kami</h4>
            <a 
              href={BUSINESS_INFO.maps.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Buka Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-full h-48 sm:h-56 bg-secondary/10 rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
             <iframe 
               src={BUSINESS_INFO.maps.embedUrl} 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
             ></iframe>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 mt-16">
        <div className="text-center text-white/40 pt-8 border-t border-white/10 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p>Designed for premium coffee experience.</p>
        </div>
      </div>
    </footer>
  );
}
