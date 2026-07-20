import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import FeaturedMenu from '@/components/sections/FeaturedMenu';
import Facilities from '@/components/sections/Facilities';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import Booking from '@/components/sections/Booking';
import Footer from '@/components/sections/Footer';
import Head from 'next/head';
import { BUSINESS_INFO } from '@/lib/business-info';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: BUSINESS_INFO.name,
    address: BUSINESS_INFO.address,
    telephone: BUSINESS_INFO.contact.display,
    openingHours: 'Mo-Su 10:00-23:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.rating.score.toString(),
      reviewCount: BUSINESS_INFO.rating.reviewsCount.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="scroll-smooth">
        <Hero />
        <About />
        <FeaturedMenu />
        <Gallery />
        <Facilities />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
