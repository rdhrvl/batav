import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-secondary/50" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-6 py-4 bg-white border border-secondary/20 rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-foreground placeholder-gray-400 outline-none"
        placeholder="Cari menu favoritmu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
