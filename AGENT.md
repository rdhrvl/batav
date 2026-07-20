# AGENT.md — Batapav Coffee & Eatery Website

Dokumen ini adalah *governing rules* untuk AI coding agent (Antigravity) yang mengerjakan project ini. Semua keputusan implementasi harus tunduk pada dokumen ini. Jika ada instruksi user yang bertentangan dengan aturan di sini, klarifikasi dulu sebelum eksekusi.

**Sumber kebenaran (source of truth):** `PRD_Batapav_Final.md` (Bagian I–III). Dokumen ini adalah turunan operasionalnya untuk keperluan development.

**Dokumen terkait:** `README.md` (konteks produk & setup), `ARCHITECTURE.md` (alasan keputusan teknis & kapan pindah ke Skenario B — kalau bingung "kenapa begini", cek di sana dulu sebelum improvisasi).

---

## 1. Scope Aktif

Project ini berjalan di **Skenario A — Company Profile & Digital Menu (tanpa transaksi)**.

- **Boleh dikerjakan:** semua requirement F-01 s/d F-07, NF-01 s/d NF-04.
- **Tidak boleh dikerjakan tanpa konfirmasi eksplisit:** apa pun yang berbau Skenario B — self-order, payment, order management backend, integrasi POS, WebSocket real-time. Ini adalah *future roadmap*, bukan scope saat ini.
- Jika user meminta fitur yang jelas-jelas masuk Skenario B, agent wajib flag: *"Ini di luar scope Skenario A yang aktif — lanjutkan sebagai persiapan Skenario B, atau tetap fokus di Skenario A?"*

## 2. Tech Stack — Non-negotiable

| Layer | Wajib Pakai |
|---|---|
| Framework | Next.js (App Router), SSR/SSG |
| Styling | Tailwind CSS |
| Icons | **Lucide React — dilarang keras pakai emoji di UI** (termasuk placeholder/comment kode yang akan jadi UI-facing text) |
| Data Menu | Supabase (PostgreSQL), diakses lewat satu layer (`lib/menu.ts`) via ISR — jangan query Supabase langsung dari komponen |
| State/Search | Client-side atas hasil fetch/ISR, tanpa library berat tambahan kecuali benar-benar dibutuhkan (zero-lag requirement F-01) |

**Dilarang:** menambahkan auth system, backend order management, atau tabel transaksional (order/stok/payment) di scope Skenario A — ini over-engineering untuk kebutuhan saat ini (lihat Bagian 9 PRD).

**Catatan soal Supabase — jangan disalahartikan sebagai "sudah masuk Skenario B":** Supabase di project ini **hanya berperan sebagai CRUD data menu** (staff update harga/menu lewat Table Editor), bukan backend transaksional. Ini beda konteks dengan rekomendasi PostgreSQL di Bagian 9-12 PRD yang levelnya order/stok dengan kebutuhan ACID akibat concurrency tinggi. Jangan gunakan tabel `menu_items` untuk menyimpan data order, reservasi, atau apa pun yang sifatnya transaksional — kalau nanti Skenario B disepakati, skema order dirancang terpisah, bukan menumpang di tabel menu ini.

## 3. Aturan Desain

- **Warna & tipografi wajib ikut design token di README.md Bagian 8** — jangan improvisasi palet baru.
- Heading pakai Poppins, body pakai Inter.
- Nuansa visual: Modern Industrial — hangat, cozy, bukan minimalis dingin/corporate.
- Semua ikon (kategori menu, sosial media, fasilitas, dll) pakai **Lucide React**. Tidak ada emoji di kode maupun output UI, meskipun PRD asal menggunakan emoji sebagai penanda kategori (☕🍹) — itu representasi dokumen, bukan spesifikasi UI final.

## 4. Aturan Data & Konten

- Semua data bisnis statis (nama, alamat, jam operasional, kontak, rating) **wajib** bersumber dari satu konstanta terpusat (mis. `lib/business-info.ts`), jangan hardcode berulang di banyak komponen.
- Mapping kategori menu (Coffee/Non-Coffee/Food/Snack/Party Menu/Extras) wajib mengikuti tabel di README.md Bagian 5 — termasuk relabeling ("T" → "Tea", "FOODFOOD" → "Main Course").
- Format harga: fungsi formatter terpusat (`formatPrice()`), bukan `.toLocaleString()` yang di-scatter di banyak tempat.
- Badge "Best Seller" dan badge lain harus data-driven dari field di JSON (atau daftar override terpisah), bukan hardcode di JSX per-item.

## 4a. Menu Update Workflow (Supabase)

- Data menu **wajib** hidup di tabel Supabase (`menu_items`), bukan lagi di file JSON — `Menu_Batapav.json` cuma dipakai sekali sebagai seed data awal (script import), setelah itu bukan sumber runtime.
- `lib/menu.ts` fetch dari Supabase via `lib/supabase.ts`, dan wajib dipanggil dalam konteks **ISR** (`revalidate` interval, bukan `no-store`/`force-dynamic` di setiap request) — supaya NF-01 (load < 2 detik) tidak terganggu oleh round-trip database per pelanggan.
- Jangan expose write-access (insert/update/delete) tabel menu ke client-side/browser. Perubahan data menu hanya lewat Supabase Table Editor (staff) atau service role di server — tidak ada form "edit menu" di frontend publik pada scope Skenario A.
- Kalau field baru ditambahkan di tabel (mis. `badge`, `deskripsi`, `image_url`), update tipe `MenuItem` di `lib/types.ts` dan pastikan mapping kategori (Bagian README Bagian 5) tetap konsisten — jangan biarkan mapping kategori nge-drift antara kode dan isi tabel.

## 5. Reservasi WhatsApp (F-03–F-05)

- Format pesan WA **wajib persis** sesuai template di PRD Bagian 5.2 — jangan ubah struktur/urutan field.
- Validasi input di client sebelum generate link (nama tidak kosong, nomor WA valid, tanggal/jam terisi).
- Disclaimer *"Reservasi Anda akan tercatat secara sah setelah menerima konfirmasi balasan dari admin WhatsApp kami."* wajib tampil, jangan dihilangkan atau diringkas.
- Generator link WA dipisah ke `lib/whatsapp.ts` — reusable, testable, dan siap diganti pemanggilannya jika nanti pindah ke backend order management (Skenario B).

## 6. Performance & SEO (NF-01 s/d NF-04)

- Semua gambar: `next/image`, format webp/avif, lazy load default (kecuali hero image di atas fold).
- Halaman detail menu (`/menu/[slug]`) harus SSR/SSG, bukan client-only render — supaya ter-index.
- JSON-LD `LocalBusiness` schema wajib ada di `<head>` halaman utama, isi lengkap: koordinat, jam operasional, rating, nomor telepon.
- Jangan menambah dependency client-side besar (heavy animation library, dsb) yang berisiko menurunkan Lighthouse score.

## 7. Kesiapan Migrasi ke Skenario B

Meski Skenario B belum dikerjakan, kode Skenario A harus ditulis dengan disiplin agar migrasi tidak butuh rombak total:

- Akses data menu **selalu** lewat `lib/menu.ts` — saat migrasi ke database, hanya file ini yang berubah, komponen tidak perlu disentuh.
- Logika reservasi WA **selalu** lewat `lib/whatsapp.ts` — saat migrasi ke order management backend, ganti implementasi di sini, bukan di komponen form.
- Jangan couple komponen UI langsung ke struktur `Menu_Batapav.json` mentah — selalu lewat tipe/interface (`MenuItem`) yang didefinisikan di `lib/types.ts`, supaya sumber data bisa diganti tanpa ubah kontrak.
- Jangan asumsikan tidak akan ada concurrency/transaksi selamanya — tapi juga jangan bangun infrastruktur untuk itu sekarang (YAGNI). Cukup jaga *boundary* yang jelas di poin-poin di atas.

## 8. Alur Kerja Agent

1. Baca `README.md` untuk konteks produk lengkap sebelum mulai task apa pun.
2. Untuk keputusan desain visual yang ambigu (spacing, hierarki, micro-interaction), rujuk ke aturan `tasteskill` sebagai otoritas desain jika tersedia di project; jika tidak, ikuti prinsip di Bagian 3 dokumen ini.
3. Untuk perubahan struktur data menu atau kontrak `lib/menu.ts`, selalu cek dampaknya ke seluruh komponen yang mengonsumsinya sebelum commit.
4. Jangan menambah scope (fitur Skenario B, dependency baru, refactor besar) tanpa diminta eksplisit — task kecil dan terarah lebih diutamakan daripada perubahan luas sekaligus.