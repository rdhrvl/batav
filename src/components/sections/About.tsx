import Image from 'next/image';

const getPlaceholder = (text: string) => 
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#E8E8E8"/><text x="50%" y="50%" font-family="sans-serif" font-weight="bold" font-size="48" fill="#A0A0A0" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`
  )}`;

export default function About() {
  return (
    <section id="about" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Lebih Dari Sekadar <span className="text-accent">Kopi</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Selamat datang di Batapav Coffee & Eatery. Berangkat dari kecintaan kami terhadap ruang sosial yang hangat, kami memadukan estetika industrial modern dengan kenyamanan sebuah rumah.
              </p>
              <p>
                Berlokasi di jantung Kebayoran Baru, Jakarta Selatan, kami mendesain tempat ini untuk menjadi *digital hub* Anda. Baik untuk bekerja santai, meeting bersama kolega, atau sekadar menghabiskan akhir pekan bersama yang terkasih.
              </p>
            </div>
            <div className="pt-4">
              <a href="#gallery" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Lihat Galeri Kami
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-secondary/10">
              <Image 
                src={getPlaceholder('About Batapav')}
                alt="Batapav Coffee Concept"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
