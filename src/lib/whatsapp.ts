import { BUSINESS_INFO } from './business-info';

export interface ReservationData {
  nama: string;
  wa: string;
  tanggal: string;
  jam: string;
  pax: number;
  catatan?: string;
}

export function generateWhatsAppLink(data: ReservationData): string {
  const message = `Halo Batapav, saya ingin melakukan reservasi:

Nama: ${data.nama}
No. WA: ${data.wa}
Tanggal: ${data.tanggal}
Jam: ${data.jam}
Jumlah Pax: ${data.pax}
Catatan: ${data.catatan || '-'}

Mohon konfirmasinya. Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=${encodedMessage}`;
}
