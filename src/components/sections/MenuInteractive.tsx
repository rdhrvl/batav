"use client";

import { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '@/lib/types';
import { mapCategory } from '@/lib/menu';
import SearchBar from '@/components/ui/SearchBar';
import FilterTabs from '@/components/ui/FilterTabs';
import MenuCard from '@/components/ui/MenuCard';

interface MenuInteractiveProps {
  initialItems: MenuItem[];
}

export default function MenuInteractive({ initialItems }: MenuInteractiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');

  // Hardcode category tabs as per requirements mapping
  const CATEGORIES: (MenuCategory | 'All')[] = [
    'All', 'Coffee', 'Non-Coffee', 'Food', 'Snack', 'Party Menu', 'Extras'
  ];

  const filteredItems = useMemo(() => {
    return initialItems.filter(item => {
      // 1. Filter by Search Query (fuzzy/substring match case-insensitive)
      const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      if (!matchesSearch) return false;

      // 2. Filter by Category
      if (selectedCategory === 'All') return true;
      
      const mappedCat = mapCategory(item.kategori);
      return mappedCat === selectedCategory;
    });
  }, [initialItems, searchQuery, selectedCategory]);

  if (initialItems.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-secondary/50 rounded-xl">
        <p className="text-secondary">Belum ada menu yang tersedia saat ini.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <div className="mb-8">
        <FilterTabs 
          categories={CATEGORIES} 
          selected={selectedCategory} 
          onSelect={(cat) => setSelectedCategory(cat as MenuCategory | 'All')} 
        />
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuCard key={item.id || item.nama} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-secondary text-lg">Oops! Menu tidak ditemukan.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 text-accent hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
