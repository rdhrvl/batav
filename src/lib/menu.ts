import { supabase } from './supabase';
import { MenuItem, MenuCategory } from './types';

// Map original categories from JSON/DB to Frontend categories
export function mapCategory(original: string): MenuCategory | null {
  const cat = original.toUpperCase();
  if (['COFFEE-MILK', 'THE COFFEE', 'COFFEE-MILK (500ML)'].includes(cat)) {
    return 'Coffee';
  }
  if (['MOCKTAILS', 'T', 'MILKY', 'SPECIAL-T', 'MILKY (500ML)', 'OTHERS (500ML)'].includes(cat)) {
    return 'Non-Coffee';
  }
  if (['FOODFOOD', 'MENTAI SERIES', 'TOAST'].includes(cat)) {
    return 'Food';
  }
  if (['SNACKS'].includes(cat)) {
    return 'Snack';
  }
  if (['FOODFOOD (PARTY)'].includes(cat)) {
    return 'Party Menu';
  }
  if (['EXTRAS', 'EXTRA'].includes(cat)) {
    return 'Extras';
  }
  return null; // Unknown or unused
}

// Relabel logic for UI display if needed (e.g. "T" -> "Tea")
export function relabelOriginalCategory(original: string): string {
  const cat = original.toUpperCase();
  if (cat === 'T') return 'Tea';
  if (cat === 'SPECIAL-T') return 'Special Tea';
  if (cat === 'FOODFOOD') return 'Main Course';
  return original;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  // Use Next.js fetch with ISR revalidation if we were using REST API directly, 
  // but with supabase-js, it uses fetch under the hood. 
  // However, in Next.js 15, we can just fetch data directly in a Server Component 
  // and Next.js caches it based on page config or we can export `revalidate` from the page.
  
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('kategori', { ascending: true })
    .order('nama', { ascending: true });

  if (error) {
    console.error('Error fetching menu items from Supabase:', error);
    return [];
  }

  return (data as MenuItem[]) || [];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp '); // add space after Rp
}
