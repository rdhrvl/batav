import { MenuCategory } from '@/lib/types';

interface FilterTabsProps {
  categories: (MenuCategory | 'All')[];
  selectedCategory: string;
  onSelectCategory: (category: MenuCategory | 'All') => void;
}

export default function FilterTabs({ 
  categories, 
  selected, 
  onSelect 
}: { 
  categories: string[], 
  selected: string, 
  onSelect: (cat: string) => void 
}) {
  return (
    <div className="flex overflow-x-auto gap-3 pb-4 mb-8 snap-x hide-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 snap-start border ${
            selected === cat 
              ? 'bg-accent text-primary border-accent shadow-md' 
              : 'bg-white text-gray-600 border-secondary/20 hover:border-accent/50 hover:bg-secondary/5'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
