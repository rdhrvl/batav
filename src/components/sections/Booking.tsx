"use client";

import { useState } from 'react';
import { generateWhatsAppLink, ReservationData } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

export default function Booking() {
  const [formData, setFormData] = useState<ReservationData>({
    nama: '',
    wa: '',
    tanggal: '',
    jam: '',
    pax: 2,
    catatan: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ReservationData, string>> = {};
    if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi';
    if (!formData.wa.trim()) newErrors.wa = 'Nomor WA wajib diisi';
    if (!formData.tanggal) newErrors.tanggal = 'Tanggal wajib dipilih';
    if (!formData.jam) newErrors.jam = 'Jam wajib dipilih';
    if (formData.pax < 1) newErrors.pax = 'Minimal 1 pax';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const waLink = generateWhatsAppLink(formData);
      window.open(waLink, '_blank');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'pax' ? parseInt(value) || 0 : value 
    }));
    if (errors[name as keyof ReservationData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-24 bg-background text-foreground border-t border-secondary/10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Reservasi Meja</h2>
          <p className="text-secondary max-w-xl mx-auto">
            Amankan spot favoritmu. Isi form di bawah ini dan kami akan memandu langkah selanjutnya via WhatsApp.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-secondary/5 border border-secondary/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="nama" className="block text-sm font-bold text-primary">Nama Lengkap</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className={`w-full p-4 bg-secondary/5 border rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 ${errors.nama ? 'border-red-500' : 'border-transparent'}`}
                placeholder="Masukkan nama Anda"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="wa" className="block text-sm font-bold text-primary">Nomor WhatsApp</label>
                <input
                  type="tel"
                  id="wa"
                  name="wa"
                  value={formData.wa}
                  onChange={handleChange}
                  className={`w-full p-4 bg-secondary/5 border rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 ${errors.wa ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="08123456789"
                />
                {errors.wa && <p className="text-red-500 text-sm mt-1">{errors.wa}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pax" className="block text-sm font-bold text-primary">Jumlah Orang (Pax)</label>
                <input
                  type="number"
                  id="pax"
                  name="pax"
                  min="1"
                  value={formData.pax}
                  onChange={handleChange}
                  className={`w-full p-4 bg-secondary/5 border rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 ${errors.pax ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.pax && <p className="text-red-500 text-sm mt-1">{errors.pax}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="tanggal" className="block text-sm font-bold text-primary">Tanggal</label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  min={today}
                  value={formData.tanggal}
                  onChange={handleChange}
                  className={`w-full p-4 bg-secondary/5 border rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 ${errors.tanggal ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.tanggal && <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="jam" className="block text-sm font-bold text-primary">Waktu Kedatangan</label>
                <input
                  type="time"
                  id="jam"
                  name="jam"
                  value={formData.jam}
                  onChange={handleChange}
                  className={`w-full p-4 bg-secondary/5 border rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 ${errors.jam ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.jam && <p className="text-red-500 text-sm mt-1">{errors.jam}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="catatan" className="block text-sm font-bold text-primary">Catatan Tambahan (Opsional)</label>
              <textarea
                id="catatan"
                name="catatan"
                rows={3}
                value={formData.catatan}
                onChange={handleChange}
                className="w-full p-4 bg-secondary/5 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all duration-300 resize-none"
                placeholder="Ada request khusus? (Misal: Minta area merokok, ulang tahun)"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all duration-300 group"
              >
                <span>Lanjutkan ke WhatsApp</span>
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <p className="text-center text-sm italic text-secondary/70 mt-6">
                * Reservasi Anda akan tercatat secara sah setelah menerima konfirmasi balasan dari admin WhatsApp kami.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
