import Link from 'next/link';
import { Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full mb-8">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium">4.9/5 dari 533+ Ulasan Google</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Modern Industrial <br className="hidden md:block"/> Hangout Space
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
          Nikmati kopi spesialti kami di tengah atmosfer hangat yang terinspirasi dari arsitektur industrial Kebayoran Baru.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/#booking" 
            className="w-full sm:w-auto bg-accent text-primary font-bold px-8 py-4 rounded-full hover:bg-accent/90 transition-all hover:scale-105"
          >
            Reservasi Sekarang
          </Link>
          <Link 
            href="/menu" 
            className="w-full sm:w-auto bg-transparent border-2 border-white/80 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all hover:scale-105"
          >
            Lihat Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
