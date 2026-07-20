"use client";

import { useState } from 'react';
import { BUSINESS_INFO } from '@/lib/business-info';
import { MapPin, Phone, Clock, Copy, Check } from 'lucide-react';

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
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin!' : 'Salin Alamat'}
                </button>
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
          <h4 className="font-bold text-lg mb-6 tracking-wide">Lokasi Kami</h4>
          <div className="w-full h-48 sm:h-56 bg-secondary/10 rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
             {/* Using an iframe for Google Maps based on standard embed URL structure (Placeholder location coordinates for Kebayoran Baru) */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3966.082729112933!2d106.7972!3d-6.2529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMTAuNCJTIDEwNsKwNDcnNDkuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
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
