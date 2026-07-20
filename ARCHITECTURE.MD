# ARCHITECTURE.md — Batapav Coffee & Eatery

Dokumen ini menjawab **"kenapa"**, bukan "apa" atau "aturan apa" — itu sudah dijawab `README.md` dan `AGENT.md`. Isinya: alur data sistem, alasan di balik tiap keputusan teknis, dan kondisi konkret kapan project harus pindah dari Plan A ke Plan B.

Referensi utama: `PRD_Batapav_Final.md` Bagian III (Keputusan Arsitektur & Tech Stack).

---

## 1. Dua Plan, Satu Codebase

Project ini punya dua skala kebutuhan yang **saling berhubungan**, bukan dua project terpisah:

- **Plan A (aktif sekarang)** = Skenario A di PRD — company profile & digital menu, tanpa transaksi.
- **Plan B (menunggu trigger)** = Skenario B di PRD — self-order + integrasi POS.

Plan B bukan rewrite dari nol. Ia adalah **penambahan lapisan** di atas boundary yang sudah disiapkan sejak Plan A (lihat `AGENT.md` Bagian 7: `lib/menu.ts`, `lib/whatsapp.ts` sebagai satu pintu akses). Dokumen ini menjelaskan kenapa boundary itu dirancang begitu, dan apa saja yang berubah — bukan apa yang harus dibangun (itu ada di README Bagian 10).

## 2. Data Flow

### Plan A (sekarang)

```
Staff edit menu
      │
      ▼
Supabase Table Editor (tabel menu_items)
      │
      ▼  (fetch saat build, revalidate berkala — ISR)
Next.js build/revalidate
      │
      ▼
Static/edge-rendered page (CDN)
      │
      ▼
Browser pelanggan
      │
      ├── Search & filter menu → diproses client-side (tanpa round-trip server)
      └── Isi form reservasi → generate wa.me deep-link → redirect ke WhatsApp
                                (konfirmasi manual oleh admin WA, di luar sistem)
```

Karakteristik kunci: **tidak ada write-path dari pelanggan ke server**. Satu-satunya "tulis data" dalam sistem ini adalah staff lewat Supabase Table Editor — itu pun tidak real-time ke pelanggan, karena ISR nge-refresh berkala, bukan tiap detik.

### Plan B (setelah trigger, lihat Bagian 4)

```
Pelanggan scan QR meja
      │
      ▼
Mobile-first order UI (SSR/edge-rendered)
      │
      ▼
Backend order management (validasi, hitung total, dsb)
      │
      ▼
Database transaksional (order + stok, butuh ACID)
      │
      ├── Real-time status ke HP pelanggan (WebSocket/managed real-time)
      │
      └── Adapter/middleware POS (lihat Bagian 5)
              │
              ├── 1. API resmi POS (jika tersedia)
              ├── 2. Local DB bridge
              ├── 3. Printer bridge (ESC/POS)
              └── 4. Order Management Dashboard manual (MVP fallback)
```

Karakteristik kunci: **ada write-path bervolume tinggi dari banyak pelanggan bersamaan** (rush hour, banyak meja submit order berbarengan) — inilah yang butuh integritas ACID dan bikin kompleksitasnya beda level dari Plan A.

## 3. Decision Log

Format: **Keputusan → Alasan → Kapan direvisit.**

### D-01: Next.js (SSR/SSG) sebagai framework, di kedua plan
- **Alasan:** Memenuhi NF-01 (load < 2 detik) dan NF-02 (Lighthouse tinggi) tanpa effort optimasi manual berlebihan. Halaman detail menu tetap ter-index SEO meski shell utama SPA.
- **Revisit jika:** Tidak ada indikasi perlu revisit — ini valid untuk kedua plan.

### D-02: Data menu di Supabase (PostgreSQL), bukan JSON statis murni
- **Alasan:** Problem 1 di Lean Canvas eksplisit minta menu "ter-update" — kalau hanya developer yang bisa ubah harga (via redeploy), itu mengulang masalah lama (info menu stale, mirip limitasi Instagram statis). Supabase Table Editor kasih staff kendali update mandiri tanpa minta redeploy.
- **Bukan berarti "sudah masuk Plan B"** — lihat D-03.
- **Revisit jika:** Staff butuh workflow approval/multi-role sebelum harga tayang → pertimbangkan headless CMS dengan draft/publish state.

### D-03: Supabase di Plan A = CRUD ringan, bukan backend transaksional
- **Alasan:** Perlu dibedakan tegas dari kebutuhan Plan B. Supabase di sini menjawab kebutuhan *edit-ability* (siapa yang bisa ubah data), bukan *concurrency/transaksi* (banyak user nulis bersamaan dengan risiko race condition). Tidak ada order/stok/payment yang lewat tabel `menu_items`.
- **Revisit jika:** Ada permintaan fitur yang butuh tulis data dari sisi pelanggan (order, booking dengan status) — itu sinyal masuk Plan B, bukan perluasan tabel menu.

### D-04: ISR (Incremental Static Regeneration), bukan fetch on-request
- **Alasan:** Kalau tiap kunjungan pelanggan query langsung ke Supabase, ada risiko round-trip nambah waktu load dan mengancam NF-01. ISR tetap kasih halaman statis ke pelanggan, sambil data di-refresh berkala di background (mis. tiap 5–10 menit).
- **Trade-off yang disadari:** Perubahan harga oleh staff tidak instan ke pelanggan (delay maksimal seinterval revalidate). Ini trade-off yang diterima karena tidak ada kebutuhan real-time di Plan A.
- **Revisit jika:** Klien minta update harga harus tampil instan (jarang terjadi untuk kafe) → pertimbangkan on-demand revalidation (trigger dari webhook Supabase saat ada perubahan, bukan interval tetap).

### D-05: Reservasi lewat WhatsApp deep-link, tanpa backend order
- **Alasan:** F-03–F-05 di PRD tidak butuh manajemen slot/ketersediaan otomatis — konfirmasi tetap manual oleh admin WA. Backend order management di sini adalah over-engineering.
- **Revisit jika:** Volume reservasi tinggi bikin admin kewalahan balas manual → baru masuk akal bangun sistem booking dengan slot management (masih bukan otomatis level Plan B, tapi lapisan menengah).

### D-06: `lib/menu.ts` dan `lib/whatsapp.ts` sebagai satu-satunya pintu akses
- **Alasan:** Supaya migrasi ke Plan B (skema order/database lebih kompleks) tidak butuh ubah komponen UI — hanya implementasi di dua file ini yang berubah.
- **Revisit jika:** Tidak pernah — ini prinsip permanen di kedua plan, bukan keputusan sementara.

## 4. Trigger Checklist: Kapan Resmi Pindah ke Plan B

Migrasi **tidak dimulai otomatis** hanya karena roadmap menyebutnya. Perlu semua kondisi berikut terpenuhi (merujuk PRD Bagian 9 & 13):

- [ ] **Scope final disepakati tertulis dengan klien** — company profile saja vs. + self-order (PRD status masih "menunggu konfirmasi" per Bagian 13).
- [ ] **Brand/vendor POS klien teridentifikasi** (PRD Bagian 11, langkah 1).
- [ ] **Ketersediaan API POS sudah diverifikasi** — baik dari dokumentasi publik vendor maupun permintaan langsung (PRD Bagian 11, langkah 2). Kalau tidak tersedia, mulai dari Order Management Dashboard manual sebagai MVP integrasi (opsi ke-4), bukan tunda seluruh migrasi.
- [ ] **Constraint mobile-first & concurrency tinggi dikonfirmasi relevan** — misal, klien memang berencana pasang QR code di tiap meja.

Kalau salah satu belum terpenuhi, **tetap di Plan A** dan jangan mulai bangun infrastruktur Plan B (database order, backend, adapter POS) — itu melanggar prinsip YAGNI yang sudah ditetapkan di `AGENT.md` Bagian 7.

## 5. Strategi Integrasi POS (ringkasan, detail di PRD Bagian 11)

Urutan opsi dari paling otomatis ke paling manual, supaya migrasi tetap bisa mulai walau API POS klien belum pasti:

1. API resmi POS (kalau vendor sediakan).
2. Local database bridge (kalau POS simpan data di DB lokal yang bisa diakses dalam jaringan kafe, dengan izin klien).
3. Printer bridge (ESC/POS langsung ke printer dapur, terpisah dari pencatatan keuangan POS).
4. Order Management Dashboard manual — MVP fallback, staff lihat order masuk real-time lalu input manual ke POS. Bisa di-upgrade ke opsi 1–3 kapan pun tanpa migrasi besar pada sistem inti.

## 6. Yang Sengaja Tidak Dibangun di Plan A (dan kenapa)

| Tidak dibangun | Kenapa |
|---|---|
| Auth/login system | Tidak ada user account di Plan A — semua konten publik. |
| Backend order management | Reservasi cukup redirect WA (D-05). |
| Database transaksional (ACID untuk order/stok) | Tidak ada concurrency-sensitive operation di Plan A (PRD Bagian 9). |
| Real-time (WebSocket) | Tidak ada status yang perlu di-push live ke pelanggan di Plan A. |
| Adapter POS | Tidak relevan sebelum ada order untuk diteruskan ke kasir. |

Semua ini valid untuk Plan B — daftar ini bukan larangan permanen, tapi penanda "belum, karena belum ada kebutuhan nyata untuk itu di Plan A".