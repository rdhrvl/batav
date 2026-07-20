import { MenuItem } from '@/lib/types';
import { relabelOriginalCategory } from '@/lib/menu';
import Image from 'next/image';

export default function MenuCard({ item }: { item: MenuItem }) {
  // Use ui-avatars as a placeholder image generated based on the item name if image_url is not available.
  const imageUrl = item.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=F8F5F2&color=8B5E3C&size=400`;

  return (
    <div className="bg-white rounded-2xl border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-video w-full overflow-hidden bg-secondary/10">
        <Image 
          src={imageUrl} 
          alt={item.nama}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {item.badge}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-bold text-xl text-primary font-poppins">{item.nama}</h3>
          <span className="font-bold text-lg text-accent whitespace-nowrap">
            Rp {item.harga.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="mb-4">
          <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-md font-medium">
            {relabelOriginalCategory(item.kategori)}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
          {item.deskripsi || 'A signature blend crafted with passion.'}
        </p>
      </div>
    </div>
  );
}
