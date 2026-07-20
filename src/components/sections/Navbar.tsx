"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Tentang Kami', href: '/#about' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Galeri', href: '/#gallery' },
  { label: 'Fasilitas', href: '/#facilities' },
  { label: 'Ulasan', href: '/#reviews' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-2xl font-bold font-poppins tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
          >
            Batapav
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={`text-sm font-bold transition-colors hover:text-accent ${
                  isScrolled ? 'text-foreground' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/#booking"
              className="hidden sm:inline-flex bg-accent text-primary font-bold px-6 py-2.5 rounded-full hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
            >
              Reservasi
            </Link>
            
            <button 
              className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '72px' }}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8 pb-32">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="text-2xl font-bold text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-accent text-primary font-bold px-8 py-4 rounded-full text-xl w-full text-center hover:bg-accent/90 transition-colors"
          >
            Reservasi Sekarang
          </Link>
        </nav>
      </div>
    </header>
  );
}
