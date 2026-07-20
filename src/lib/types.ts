export interface MenuItem {
  id: string;
  kategori: string;
  nama: string;
  harga: number;
  badge?: string;
  deskripsi?: string;
  image_url?: string;
}

export type MenuCategory = 
  | 'Coffee' 
  | 'Non-Coffee' 
  | 'Food' 
  | 'Snack' 
  | 'Party Menu' 
  | 'Extras';
