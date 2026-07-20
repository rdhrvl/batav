import { getMenuItems } from '@/lib/menu';
import MenuInteractive from '@/components/sections/MenuInteractive';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu | Batapav Coffee & Eatery',
  description: 'Explore the full menu of Batapav Coffee & Eatery. Discover our specialty coffee, mocktails, main courses, and snacks.',
};

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Minimalist Hero/Header for Menu Page */}
        <div className="bg-primary text-background pt-32 pb-16 relative">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            <Link href="/" className="inline-flex items-center text-accent hover:text-white transition-colors mb-8 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">Eksplorasi Menu Kami</h1>
            <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
              Dari racikan kopi andalan hingga hidangan utama yang memanjakan lidah. 
              Temukan favoritmu dan nikmati momen santai di Batapav.
            </p>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 skew-x-12 transform origin-top-right hidden md:block"></div>
        </div>

        {/* Interactive Menu Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
            <MenuInteractive initialItems={items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
