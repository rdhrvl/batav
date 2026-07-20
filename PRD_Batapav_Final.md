# PRODUCT REQUIREMENTS DOCUMENT (PRD) & PRODUCT CANVAS

## Website Company Profile & Digital Menu — Batapav Coffee & Eatery

**Dokumen Versi:** 2.0 (Final)
**Target Rilis:** Q1 2026
**Author/PM:** Senior Product Manager & Coach
**Status:** Menunggu konfirmasi scope final dengan klien (lihat Bagian 9 — Skenario & Keputusan Arsitektur)

---

## BAGIAN I: PRODUCT LEAN CANVAS (STRATEGI BISNIS)

Pemetaan *Lean Canvas* untuk menyelaraskan arah bisnis Batapav dengan fungsionalitas produk digital yang akan dibangun:

| PROBLEM (Masalah) | SOLUTION (Solusi) | UNIQUE VALUE PROP. (UVP) | UNFAIR ADVANTAGE | CUSTOMER SEGMENTS |
|---|---|---|---|---|
| 1. Calon pelanggan sulit melihat daftar menu lengkap beserta harga ter-update secara online. | 1. Website satu pintu (*single-page hub*) yang responsif.<br>2. Katalog Menu Digital interaktif dengan fitur *search* dan *filter* cepat.<br>3. Form reservasi langsung terintegrasi ke WhatsApp API. | **"The Digital Gateway to South Jakarta's Warmest Modern-Industrial Hangout."** Menghadirkan kenyamanan suasana fisik Batapav langsung ke layar gawai pelanggan dengan visual estetik dan kemudahan akses informasi menu serta reservasi. | **Kekuatan Komunitas & Social Proof** — Memanfaatkan rating Google Maps yang luar biasa (**4.9/5 ⭐ dari 533+ Ulasan nyata**) sebagai jangkar utama kepercayaan pelanggan sejak detik pertama mengunjungi web. | **Primary:**<br>- Mahasiswa & Freelancer (butuh tempat WFC)<br>- Coffee Enthusiasts<br><br>**Secondary:**<br>- Pasangan & Komunitas kecil<br>- Wisatawan kuliner Jakarta Selatan |
| 2. Informasi lokasi & jam buka sering kali tersebar atau kurang terpusat. | | | | |
| 3. Alur reservasi meja yang masih manual dan lambat. | | | | |

| EXISTING ALTERNATIVES | KEY METRICS (KPI) | CHANNELS (Saluran) | COST STRUCTURE | REVENUE STREAMS |
|---|---|---|---|---|
| - Profil Instagram (terbatas pada highlight menu gambar statis).<br>- Halaman Google Maps (kurang interaktif untuk reservasi). | - Kecepatan muat halaman (target < 2 detik).<br>- Peningkatan klik CTA WhatsApp.<br>- Rasio pentalan (*Bounce Rate*). | - Google Local SEO (Pencarian "Kafe WFC Jakarta Selatan").<br>- QR Code fisik di setiap meja Batapav.<br>- Tautan di bio Instagram. | - Biaya Domain & Hosting.<br>- Pengelolaan headless CMS / backend.<br>- Biaya pemeliharaan performa & SEO lokalisasi. | - Konversi kunjungan fisik (*walk-in*) via petunjuk Maps.<br>- Peningkatan pesanan katering kelompok besar via *Party Menu*.<br>- Retensi reservasi meja harian. |

---

## BAGIAN II: PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1. Project Overview & Objectives

Proyek ini bertujuan untuk membangun sebuah situs web modern yang menggabungkan fungsi profil perusahaan (*company profile*), menu digital interaktif, dan kanal reservasi untuk **Batapav Coffee & Eatery** yang berlokasi di Kebayoran Baru, Jakarta Selatan.

**Target Pencapaian Utama:**
- Membangun citra brand (*branding*) Batapav yang hangat, modern, dan bernuansa industrial.
- Menampilkan menu secara dinamis dan mudah dicari berdasarkan file data produk `Menu_Batapav.json`.
- Mendorong tindakan konversi utama: reservasi meja, petunjuk arah Google Maps, dan hubungi via WhatsApp.
- Menyiapkan arsitektur yang siap berkembang ke arah transaksi (self-order) tanpa merombak sistem inti — lihat Bagian 9.

### 2. Informasi Utama Bisnis & Data Referensi

Semua data di bawah ini bersifat statis dan wajib tercantum pada halaman utama website:

- **Nama Bisnis:** Batapav Coffee & Eatery
- **Alamat:** Jl. Citayam, RT.7/RW.1, Rw. Bar., Kebayoran Baru, Jakarta Selatan
- **Jam Operasional:** Setiap Hari, Pukul 10.00 - 23.00
- **Kontak Utama:** 0811-3632-229 (WhatsApp & Telepon)
- **Social Proof Anchor:** Rating Google 4.9 / 5 dari total 533 Ulasan nyata ⭐

### 3. Arsitektur Informasi & Navigasi (Sitemap)

Aplikasi web didesain sebagai *Single Page Application (SPA)* dengan navigasi *Smooth Scroll* untuk menjaga kecepatan performa, namun memiliki halaman detail menu yang teroptimasi SEO.

```
[Main Landing Page]
├── 1. Hero Section (Visual Brand & CTA)
├── 2. About & Concept Section (Cerita Batapav)
├── 3. Dynamic Menu Section (Search & Filter)
├── 4. Gallery Layout (Masonry + Lightbox)
├── 5. Facilities Spotlight (Iconic Grid)
├── 6. Reviews Carousel (Google Social Proof)
├── 7. Booking Form (WhatsApp Integration)
└── 8. Footer & Contact Details (Google Maps Embed)
```

### 4. Menu Kategori & Pemetaan Data (*Menu Mapping*)

Sistem digital menu akan membaca struktur data dari `Menu_Batapav.json`. Kategori teknis dari database dipetakan ke dalam **5 Filter Utama** di sisi *frontend*:

| Kategori Filter Frontend | Kategori Asal pada Database (`Menu_Batapav.json`) | Keterangan Aturan UI |
|---|---|---|
| ☕ Coffee | COFFEE-MILK, THE COFFEE, COFFEE-MILK (500ML) | Tampilkan ikon cangkir kopi. Pisahkan sub-bagian botol 500ml jika filter aktif. |
| 🍹 Non-Coffee | MOCKTAILS, T, MILKY, SPECIAL-T, MILKY (500ML), OTHERS (500ML) | Label "T" di-render sebagai "Tea", "SPECIAL-T" sebagai "Special Tea". |
| 🍹 Food | FOODFOOD, MENTAI SERIES, TOAST | Label "FOODFOOD" di-render sebagai "Main Course". |
| 🍹 Snack | SNACKS | Menu pendamping / cemilan ringan. |
| 🍹 Party Menu | FOODFOOD (PARTY) | Menu porsi besar / *sharing menu* dengan harga rentang Rp90.000 - Rp190.000. |
| 🍹 Extras | EXTRAS, EXTRA | Tampilkan sebagai menu tambahan opsional di bagian bawah menu utama. |

**Format Harga & Menu Card:**
- Harga diformat menggunakan standar rupiah estetik minimalis. Contoh: nilai integer `26000` di dalam JSON di-render sebagai **Rp 26.000** atau **26k** sesuai pilihan estetika desain.
- Setiap kartu menu (*menu card*) wajib menampilkan: Nama, Kategori yang sudah dirapikan, Harga, dan Badge khusus (misal: "Best Seller" untuk *BATA Single* atau *Salmon Kani Mentai*).

### 5. Detail Kebutuhan Fungsional (Functional Requirements)

#### 5.1 Sistem Filter & Pencarian Menu
- **F-01 (Pencarian Real-time):** Kolom input teks untuk mencari nama menu. Pencarian bersifat *case-insensitive* dan langsung memfilter kartu menu tanpa memuat ulang halaman (*zero lag*).
- **F-02 (Filter Kategori):** Tombol tab kategori dinamis yang memfilter menu secara instan berdasarkan pemetaan kategori di atas.

#### 5.2 Alur Reservasi Meja via WhatsApp
- **F-03 (Form Input):** Formulir input terdiri dari: Nama Lengkap, Nomor WhatsApp Aktif, Tanggal Kunjungan, Waktu/Jam Datang, Jumlah Tamu (Pax), Catatan Khusus (misal: Indoor/Outdoor/Smoking Area).
- **F-04 (Konversi Pesan):** Saat pengguna menekan tombol "Kirim Reservasi", sistem memvalidasi input lalu menyusun pesan terformat dan mengarahkan pengguna ke tautan WhatsApp API dengan format:
  ```
  Halo Batapav Coffee & Eatery, saya ingin melakukan reservasi meja:
  Nama: [Nama]
  WA: [Nomor HP]
  Tanggal: [Tanggal]
  Jam: [Waktu]
  Jumlah Orang: [Pax] orang
  Catatan: [Catatan]
  Mohon konfirmasi ketersediaan meja kami. Terima kasih!
  ```
- **F-05 (Catatan Disclaimer):** Di bawah tombol submit form wajib tertera teks disclaimer: *"Reservasi Anda akan tercatat secara sah setelah menerima konfirmasi balasan dari admin WhatsApp kami."*

#### 5.3 Peta & Integrasi Kontak
- **F-06 (Salin Alamat):** Tombol satu kali klik untuk menyalin alamat lengkap Batapav ke *clipboard* ponsel pengguna.
- **F-07 (Google Maps):** Embed Google Maps responsif yang interaktif dan tombol luar untuk membuka rute langsung di aplikasi navigasi pengguna (*Open in Google Maps*).

### 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

#### 6.1 Performa & Optimasi
- **NF-01 (Kecepatan Memuat):** Waktu respon halaman pertama kurang dari 2 detik di jaringan seluler 4G.
- **NF-02 (Lighthouse Score):** Target skor audit performa Google Lighthouse tinggi pada aspek Performance, SEO, dan Accessibility.
- **NF-03 (Media Optimization):** Seluruh gambar galeri cafe wajib menggunakan format kompresi modern (.webp atau .avif) dan menerapkan teknik *lazy loading* untuk menghemat kuota pengunjung.

#### 6.2 SEO Lokalisasi (*Local SEO*)
- **NF-04 (Schema Markup):** Memasang JSON-LD *LocalBusiness Schema* pada metadata HTML untuk memastikan Google Search Engine mengenali koordinat lokasi, jam operasional, rating bintang, dan nomor telepon Batapav secara akurat di hasil pencarian organik lokal.

### 7. Pedoman Desain & Palet Warna (Design Style Guide)

Situs web dirancang dengan gaya **Modern Industrial Coffee Shop** yang bersih, hangat, dan memberikan kesan ruang yang nyaman (*cozy*).

- **Warna Primer (Primary):** `#5C3A21` (Cokelat Espresso — melambangkan keaslian kopi)
- **Warna Sekunder (Secondary):** `#8B5E3C` (Cokelat Hangat / Kayu)
- **Warna Aksen (Accent):** `#D4A373` (Sand/Terracotta — melambangkan bata merah industrial)
- **Warna Latar (Background):** `#F8F5F2` (Warm White — ramah di mata untuk membaca menu lama)
- **Warna Gelap (Dark Text):** `#1F1F1F` (Charcoal — teks utama agar kontras tinggi)
- **Tipografi:**
  - *Heading:* Poppins (Sifat: Modern, Tegas, Kokoh)
  - *Body Text:* Inter (Sifat: Keterbacaan sangat tinggi di ponsel)

### 8. Skema Pengembangan Selanjutnya (Future Roadmap - v2)

1. **Online Self-Order (QR Meja):** Integrasi sistem pesan mandiri di meja menggunakan scan QR code yang langsung mengirimkan pesanan ke mesin kasir dapur (*POS System*).
2. **Sistem Loyalti Digital:** Fitur pengumpulan poin digital bagi pelanggan setia Batapav untuk ditukarkan dengan minuman gratis.
3. **Blog & Komunitas:** Ruang edukasi seputar proses pembuatan kopi (*specialty coffee*) dan dokumentasi acara komunitas lokal yang diadakan di kafe Batapav.

---

## BAGIAN III: KEPUTUSAN ARSITEKTUR & TECH STACK

> **Catatan Status:** Scope final (company profile saja vs. company profile + transaksi self-order) belum dikonfirmasi dengan klien. Bagian ini mendokumentasikan analisis dan keputusan arsitektur untuk kedua skenario, sehingga tim development bisa langsung bergerak begitu scope final disepakati.

### 9. Skenario A — Company Profile & Digital Menu (Tanpa Transaksi)

Skenario ini mencakup seluruh requirement di Bagian II (F-01 s/d F-07) tanpa proses pembayaran atau pemesanan langsung ke dapur/kasir.

**Kebutuhan sistem:**
- Rendering cepat & SEO-friendly untuk seluruh halaman (termasuk halaman detail menu).
- Data menu bersifat statis/semi-statis (dibaca dari `Menu_Batapav.json`, tanpa kebutuhan database transaksional).
- Tidak ada concurrency-sensitive operation (tidak ada race condition pada stok/order).
- Reservasi meja cukup diselesaikan lewat redirect ke WhatsApp (tanpa backend order management).

**Rekomendasi Tech Stack:**

| Layer | Rekomendasi | Alasan |
|---|---|---|
| Frontend/Rendering | Server-side rendering / static generation framework (mis. Next.js) | Memenuhi NF-01 (load < 2 detik) dan NF-02 (Lighthouse tinggi) tanpa effort optimasi manual berlebihan; halaman detail menu tetap ter-index SEO meski shell utama adalah SPA. |
| Styling | Utility-first CSS framework (mis. Tailwind CSS) | Implementasi cepat terhadap design system pada Bagian 7 (warna, tipografi). |
| Data Menu | JSON statis (`Menu_Batapav.json`) sebagai sumber data langsung, tanpa database | Tidak ada kebutuhan transaksi/concurrency; database penuh jadi over-engineering di skenario ini. |
| Search & Filter | Client-side fuzzy search (F-01, F-02) | Zero-lag filtering tanpa round-trip ke server. |
| Reservasi | Generate WhatsApp deep-link di client-side (F-04) | Tidak butuh backend order management. |
| Hosting | Static/edge hosting dengan CDN & auto image optimization | Mendukung NF-03 (webp/avif + lazy load) secara native. |

### 10. Skenario B — Dengan Fitur Transaksi (Self-Order, sesuai Roadmap v2)

Skenario ini berlaku bila scope final klien mencakup pemesanan/self-order dengan tiga constraint tambahan yang telah dikonfirmasi:
1. UI **mobile-first**, karena diakses langsung dari HP pelanggan (scan QR di meja).
2. **Concurrency tinggi** — kafe bisa ramai dengan banyak meja submit order bersamaan pada jam sibuk.
3. **Integrasi ke sistem POS/kasir existing milik klien**, dengan ketersediaan API yang belum dipastikan.

**Kebutuhan sistem yang berubah dari Skenario A:**
- Data order & pembayaran butuh **integritas transaksi kuat** (ACID) — tidak boleh ada race condition pada stok atau nomor antrian saat banyak order masuk bersamaan.
- Sistem harus **auto-scale** saat lonjakan trafik jam sibuk tanpa downtime.
- Arsitektur integrasi POS harus **modular** (adapter pattern), karena status API POS belum pasti dan bisa berubah selama proyek berjalan.

**Rekomendasi Tech Stack:**

| Layer | Rekomendasi | Alasan |
|---|---|---|
| Frontend/Rendering | SSR/edge-rendered framework (mis. Next.js) | First-load cepat di koneksi 4G tidak stabil di dalam kafe — kritikal karena pelanggan bisa batal order jika loading lambat. |
| Backend & Database | Relational database dengan transaksi ACID (mis. PostgreSQL) | Data pesanan & pembayaran butuh konsistensi kuat; database dokumen (NoSQL) berisiko inkonsisten pada skenario concurrency tinggi. |
| Hosting/Compute | Platform serverless/edge dengan auto-scaling | Menangani lonjakan trafik jam makan siang/sore tanpa provisioning manual. |
| Real-time status order | WebSocket/managed real-time service | Untuk update status pesanan (diterima → diproses → selesai) secara langsung ke HP pelanggan. |
| Integrasi POS | Adapter/middleware layer terpisah dari sistem inti | Lihat Bagian 11 — strategi ini memungkinkan cara integrasi diganti (API resmi / database bridge / dashboard manual) tanpa membongkar sistem utama. |

### 11. Strategi Integrasi POS (Kontingensi: API Tidak Tersedia)

Karena ketersediaan API POS klien belum dapat dipastikan, integrasi didesain sebagai **layer adapter terpisah** dari sistem inti (menu, order, pembayaran), dengan urutan opsi dari yang paling otomatis ke paling manual:

1. **API resmi POS** (jika vendor menyediakan) — integrasi langsung, order masuk otomatis ke sistem kasir.
2. **Local database bridge** — bila POS menyimpan data di database lokal yang dapat diakses dalam jaringan kafe (dengan izin klien).
3. **Printer bridge (ESC/POS ke printer dapur)** — order dicetak langsung sebagai ticket ke printer dapur, terpisah dari pencatatan keuangan di POS.
4. **Order Management Dashboard manual** — fallback minimum viable: staff melihat order masuk di dashboard real-time dan menginput manual ke POS. Solusi ini tetap dapat diupgrade ke opsi 1-3 kapan pun tanpa migrasi besar pada sistem inti.

**Langkah verifikasi sebelum development dimulai:**
1. Identifikasi brand/vendor POS yang digunakan klien.
2. Cek ketersediaan API — baik dari dokumentasi publik vendor maupun permintaan langsung (banyak vendor menyediakan API by request meski tidak didokumentasikan publik).
3. Jika tidak tersedia sama sekali, mulai dari Order Management Dashboard sebagai MVP integrasi, dengan ekspektasi yang dikomunikasikan jelas ke klien bahwa proses bersifat semi-otomatis pada tahap awal.

### 12. Perbandingan Stack yang Dipertimbangkan (Skenario B)

| Kriteria | MERN (MongoDB-based) | Fullstack JS modern (SSR + Relational DB) | TALL Stack |
|---|---|---|---|
| Performa mobile (SSR/edge) | Perlu setup tambahan | Native kuat | Perlu effort ekstra (round-trip server-side lebih berat di koneksi lambat) |
| Konsistensi data transaksi | Lemah (dokumen-based, rawan inkonsisten) | Kuat (relational, ACID) | Kuat (relational, ACID) |
| Auto-scaling saat rush hour | Perlu setup manual | Native (serverless/edge) | Perlu setup manual |
| Real-time order status | Baik | Baik | Bisa, namun tooling relatif lebih baru |
| Fleksibilitas adapter POS | Baik | Baik (service ringan, mudah dipisah) | Baik, umumnya tetap butuh service terpisah |

**Keputusan:** Fullstack JS modern dengan SSR/edge rendering dan relational database (bukan MongoDB murni) direkomendasikan untuk Skenario B, karena menyeimbangkan ketiga constraint (mobile-first, concurrency tinggi, fleksibilitas integrasi POS) tanpa mengorbankan integritas data transaksi.

### 13. Catatan Akhir

- Keputusan final tech stack tetap tunduk pada hasil diskusi scope dengan klien, kapasitas tim development, dan timeline proyek yang disepakati.
- Bagian III bersifat rekomendasi arsitektur berdasarkan requirement yang diketahui saat ini; wajib direview ulang begitu scope final (Skenario A atau B) dikonfirmasi klien, termasuk hasil verifikasi ketersediaan API POS pada Bagian 11.
