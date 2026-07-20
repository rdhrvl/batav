import { getMenuItems } from '@/lib/menu';
import MenuCard from '@/components/ui/MenuCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function FeaturedMenu() {
  const allItems = await getMenuItems();
  
  // Logic to determine featured items: 
  // Prefer items with a badge ("Best Seller", "Chef's Rec"), if none, just take the first 4.
  let featuredItems = allItems.filter(item => item.badge && item.badge.trim() !== '');
  
  if (featuredItems.length === 0) {
    featuredItems = allItems.slice(0, 4);
  } else if (featuredItems.length > 4) {
    featuredItems = featuredItems.slice(0, 4);
  } else if (featuredItems.length < 4 && allItems.length >= 4) {
    // Fill up to 4 items if we have some badged but less than 4
    const nonFeatured = allItems.filter(item => !item.badge || item.badge.trim() === '');
    featuredItems = [...featuredItems, ...nonFeatured.slice(0, 4 - featuredItems.length)];
  }

  return (
    <section id="menu" className="py-24 bg-white text-foreground">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-primary">Featured Menu</h2>
            <p className="text-secondary max-w-xl">
              Cicipi hidangan favorit dan racikan kopi terbaik yang selalu menjadi pilihan utama para pelanggan Batapav.
            </p>
          </div>
          <Link 
            href="/menu" 
            className="hidden sm:inline-flex items-center text-primary font-bold hover:text-accent transition-colors"
          >
            Lihat Menu Lengkap <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile-only view full menu button */}
        <div className="mt-10 text-center sm:hidden">
          <Link 
            href="/menu" 
            className="inline-flex items-center justify-center w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
          >
            Lihat Menu Lengkap <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
