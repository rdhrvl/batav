"use client";

import { BUSINESS_INFO } from '@/lib/business-info';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const REVIEWS = [
  {
    name: 'Andi S.',
    text: 'Tempatnya cozy banget buat WFC. Kopinya juara, terutama Batapav Aren. Colokan banyak dan Wi-Fi kencang.',
    rating: 5
  },
  {
    name: 'Sarah M.',
    text: 'Suka banget sama suasana industrialnya. Makanannya juga enak-enak, rekomen Nasi Goreng Batapav. Pasti balik lagi!',
    rating: 5
  },
  {
    name: 'Budi W.',
    text: 'Hidden gem di Kebayoran Baru! Pewe buat nongkrong bareng temen. Harganya reasonable untuk area Jaksel.',
    rating: 5
  },
  {
    name: 'Rina T.',
    text: 'Pelayanannya ramah dan cepat. Suka sama desain interiornya yang industrial modern tapi tetap terasa hangat.',
    rating: 4
  }
];

// Kecepatan scroll dalam px/detik. Durasi animasi dihitung otomatis
// dari lebar konten, jadi kecepatan tetap konsisten walau jumlah
// review berubah nanti (tidak perlu utak-atik angka duration manual).
const PIXELS_PER_SECOND = 40;

function ReviewCard({ review }) {
  const cardRef = useRef(null);
  const [isCenter, setIsCenter] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Observer triggers when the card overlaps the exact center of the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCenter(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px -49% 0px -49%', // 2% wide zone exactly in the center
        threshold: 0
      }
    );
    
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-3xl p-8 border border-secondary/10 flex flex-col w-[320px] md:w-[380px] shrink-0 transition-all duration-500 ${
        isCenter 
          ? 'scale-105 -translate-y-2 shadow-2xl shadow-primary/20 ring-2 ring-accent/20 z-10 opacity-100' 
          : 'scale-95 shadow-sm opacity-50 hover:opacity-75'
      }`}
    >
      <div className="flex gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>

      <p className="text-secondary/90 italic mb-8 flex-grow leading-relaxed text-left">
        &quot;{review.text}&quot;
      </p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-secondary/10">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold font-poppins shrink-0">
          {review.name.charAt(0)}
        </div>
        <div className="text-left">
          <h4 className="font-bold text-primary">{review.name}</h4>
          <p className="text-sm text-gray-500">Google Review</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(40);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    const computeDuration = () => {
      // Track berisi 2 set review bersebelahan, jadi lebar satu set
      // adalah setengah dari scrollWidth total track.
      const oneSetWidth = trackRef.current.scrollWidth / 2;
      setDuration(oneSetWidth / PIXELS_PER_SECOND);
    };

    computeDuration();

    const resizeObserver = new ResizeObserver(computeDuration);
    resizeObserver.observe(trackRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section id="reviews" className="py-24 bg-secondary/5 text-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Kata Mereka</h2>
        <div className="flex items-center justify-center gap-2 mb-16">
          <span className="text-3xl font-bold font-poppins">{BUSINESS_INFO.rating.score}</span>
          <div className="flex text-accent">
            {[...Array(BUSINESS_INFO.rating.maxScore)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
          <span className="text-secondary font-medium ml-2">({BUSINESS_INFO.rating.reviewsCount}+ ulasan Google)</span>
        </div>
      </div>

      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 w-max py-20 px-6"
          style={{
            animation: reduceMotion ? 'none' : `koma-marquee ${duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {[...REVIEWS, ...REVIEWS].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes koma-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}