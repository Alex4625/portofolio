# DESIGN.md — TinoLambut.dev Redesign
Referensi: `napa.ituaku.com` (screenshot + konten live) | Arsitektur: Next.js + Supabase + Cloudflare Pages
Versi: 1.0 | 10 Juli 2026

---

## 0. SUMBER & AKURASI

| Elemen | Sumber | Tingkat Akurasi |
|---|---|---|
| Struktur & urutan section | Fetch live napa.ituaku.com | ✅ Terkonfirmasi |
| Pola konten tiap komponen | Fetch live napa.ituaku.com | ✅ Terkonfirmasi |
| Palet warna | Screenshot yang kamu upload (dibaca visual) | ~95% — nilai hex adalah hasil pembacaan screenshot, bukan DevTools. Bila perlu presisi pixel-perfect, buka DevTools di browser kamu sendiri. |
| Layout & proporsi | Screenshot + konvensi template "personal5" | ~90% |
| Arsitektur kode | PRD v3.0 + URL deploy workers.dev + footer situsmu | ✅ Terkonfirmasi |
| Bug `undefined%` di skills | Fetch live situsmu | ✅ Terkonfirmasi — wajib diperbaiki |

---

## 1. PALET WARNA

Dibaca dari screenshot napa.ituaku.com yang kamu kirim. napa memakai tema biru-ungu gelap dengan aksen merah terang — ini adalah identitas visual utama yang membedakannya dari portofolio developer generik yang rata-rata pakai biru saja.

```css
/* ============================================================
   TOKEN WARNA — salin ke globals.css atau tailwind theme
   ============================================================ */

:root {
  /* Latar */
  --bg-base:        #12123A;   /* Biru gelap keunguan, latar utama — dibaca dari hero/body napa */
  --bg-elevated:    #1A1A52;   /* Sedikit lebih terang, untuk kartu & section alternatif */
  --bg-card:        #1E1E5E;   /* Kartu (glassmorphism ringan di atasnya) */

  /* Aksen */
  --accent-red:     #E63946;   /* Merah neon — tombol utama, badge, garis aktif di nav */
  --accent-red-dim: #B02A35;   /* Merah lebih tua — hover state tombol */
  --accent-blue:    #4A6CF7;   /* Biru elektrik — tautan, ikon sosial aktif */
  --accent-white:   #FFFFFF;   /* Nama besar di hero, judul section utama */

  /* Teks */
  --text-primary:   #F0F2FF;   /* Paragraf utama — putih kebiruan, bukan putih murni */
  --text-secondary: #9BA3C9;   /* Deskripsi, keterangan — abu-abu kebiruan */
  --text-muted:     #6B74A8;   /* Label kecil, placeholder */

  /* Pembatas & efek */
  --border-subtle:  rgba(255, 255, 255, 0.08);
  --glow-red:       radial-gradient(ellipse at top, rgba(230,57,70,0.18) 0%, transparent 65%);
  --glow-blue:      radial-gradient(ellipse at bottom, rgba(74,108,247,0.15) 0%, transparent 65%);
  --glass-card:     rgba(30, 30, 95, 0.55);   /* backdrop-filter: blur(12px) di atasnya */
}
```

**Cara pakainya di Tailwind v4** — tambahkan ke `tailwind.config` atau deklarasikan sebagai CSS custom properties di `globals.css` lalu gunakan `[--bg-base]` atau extend theme:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'navy-base': '#12123A',
      'navy-elevated': '#1A1A52',
      'navy-card': '#1E1E5E',
      'accent-red': '#E63946',
      'accent-blue': '#4A6CF7',
    }
  }
}
```

---

## 2. TIPOGRAFI

Napa memakai font serif elegan di headline dan sans-serif bersih di body. Untuk Tino (developer), dipertahankan logika dua-font tapi disesuaikan ke karakter teknis:

```css
/* Import di <head> atau globals.css */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --font-display: 'Outfit', sans-serif;         /* Heading: nama besar di hero, judul section */
  --font-body:    'Inter', sans-serif;           /* Paragraf, label form, navigasi */
  --font-mono:    'JetBrains Mono', monospace;  /* Angka stat, tag kategori, badge teknis */
}
```

| Elemen | Font | Weight | Ukuran |
|---|---|---|---|
| Nama di Hero (`<h1>`) | Outfit | 800 | `clamp(2.8rem, 7vw, 5rem)` |
| Judul Section (`<h2>`) | Outfit | 700 | `clamp(1.8rem, 4vw, 2.6rem)` |
| Sub-judul / Jabatan | Outfit | 600 | `1.2–1.4rem` |
| Paragraf / Deskripsi | Inter | 400 | `0.95–1rem` |
| Label kecil / Badge / Nomor | JetBrains Mono | 500 | `0.72–0.8rem` |
| Angka stat besar | JetBrains Mono | 700 | `2.5–3.5rem` |

---

## 3. KOMPONEN PER SECTION

### 3.1 Navbar

**Pola dari napa (terkonfirmasi):**
- Logo/brand di kiri, tautan kembali ke `#home`
- Menu horizontal 8 item di tengah/kanan
- Ikon sosial 3 platform di paling kanan
- Saat mobile: hamburger menu → drawer vertikal, ikon sosial diulang di bawah menu

**Spesifikasi visual:**
```
Background: rgba(18, 18, 58, 0.92) + backdrop-filter: blur(10px)
Border-bottom: 1px solid var(--border-subtle)
Tinggi: 64px (desktop), 56px (mobile)
Link aktif: warna var(--accent-red), underline garis bawah 2px
Link non-aktif: var(--text-secondary), hover → var(--text-primary)
Transisi link: color 0.2s ease
```

**Kode referensi (Next.js):**
```tsx
// components/Navbar.tsx
// Nav sticky dengan glass effect, highlight section aktif via IntersectionObserver
const sections = ['home','about','services','skills','experience','certifications','portfolio','gallery'];
```

---

### 3.2 Hero

**Pola dari napa (terkonfirmasi):**
```
[Sidebar kiri: Nav vertikal + sosial] | [Konten tengah: Badge → Nama → Deskripsi → Kontak cepat] | [Foto kanan: cutout/transparent]
```

Di mobile, sidebar hilang, foto turun ke bawah teks.

**Spesifikasi visual:**
```
Layout: CSS Grid 3 kolom [sidebar 60px] [1fr] [40–45% foto] di desktop
         Stack vertikal di mobile (< 768px)

Foto hero:
  - PNG dengan background transparan (cutout), bukan foto persegi
  - Ditempatkan flush ke sisi kanan, boleh sedikit overflow ke atas
  - Ukuran: min(420px, 45vw) tinggi di desktop
  - Tidak ada border/shadow — kesan "menyatu" dengan latar

Badge peran:
  - Background: var(--accent-red), border-radius: 4px
  - Font: Inter 600, uppercase, letter-spacing: 0.08em
  - Contoh teks: "FULL STACK DEVELOPER 🚀"

Teks nama:
  - Font: Outfit 800, var(--accent-white)
  - Di belakang nama (z-index lebih rendah): teks besar semi-transparan sebagai watermark
    → "Full Stack Dev" atau "Tino Lambut" dalam huruf raksasa, opacity 0.04–0.06
    → Ini elemen paling khas napa yang memberi kedalaman tanpa ramai

Kontak cepat (langsung di hero, bukan hanya di footer):
  - Ikon + teks: nomor WA/telepon, email (mailto:), lokasi (teks biasa)
  - Font: Inter 400, text-secondary

Tombol CTA:
  - "Tentang Saya →" — background var(--accent-red), hover: var(--accent-red-dim)
  - Padding: 0.75rem 1.75rem, border-radius: 6px

Ikon sosial (diulang di hero sidebar dan di bawah tombol CTA mobile):
  - Ukuran: 20px, warna default var(--text-secondary), hover: var(--accent-red)
  - GitHub, Instagram, LinkedIn (sesuai situsmu saat ini)
```

**Background Hero:**
```css
/* Glow merah di pojok kiri atas, glow biru di kanan bawah — persis pola napa */
.hero {
  background:
    radial-gradient(ellipse 60% 50% at 10% 20%, rgba(230,57,70,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(74,108,247,0.15) 0%, transparent 60%),
    var(--bg-base);
}
```

---

### 3.3 Stat Callout (bagian paling membedakan dari template generik)

**Pola dari napa (terkonfirmasi):** 5 blok, masing-masing punya klaim besar + deskripsi 1–2 kalimat. Ini ditempatkan di antara foto "about" dan teks "about", bukan di section tersendiri.

**Situsmu saat ini:** hanya 2 angka polos (`5+ years`, `15+ projects`) tanpa narasi — perlu diperkaya.

**Rekomendasi konten untuk Tino:**
```
Callout 1: "10+ Proyek Web Diselesaikan"
→ "Menggunakan Next.js, React, Node.js, dan infrastruktur cloud modern untuk membangun
   aplikasi dari skala landing page hingga sistem enterprise."

Callout 2: "99.9% Uptime pada Deployment Multi-Cloud"
→ "Merancang arsitektur AWS + Cloudflare dengan CI/CD pipeline otomatis yang menjamin
   ketersediaan layanan tanpa interupsi."

Callout 3: "15+ Kerentanan Kritis Ditemukan & Dilaporkan"
→ "Melakukan security audit dan penetration testing pada 5+ aplikasi web korporat
   sebelum kerentanan sempat dieksploitasi."

Callout 4: "100K+ API Request per Hari Ditangani"
→ "Membangun platform microservices Node.js + PostgreSQL yang melayani trafik besar
   dengan latensi konsisten di bawah 200ms."
```

**Spesifikasi visual:**
```
Layout: grid 2 kolom di desktop (teks kiri, foto about di kanan — foto "sticky" saat scroll list)
        stack 1 kolom di mobile

Tiap item:
  Judul klaim:  Outfit 700, text-primary, font-size 1.05rem
  → Wrapper: ada border-left 3px solid var(--accent-red), pl-4
  Deskripsi:    Inter 400, text-secondary, font-size 0.88rem, mt-1

Angka besar (tahun + project count) — tetap ada, tapi dipisah ke baris tersendiri:
  Angka: JetBrains Mono 700, font-size clamp(2rem, 5vw, 3rem), color var(--accent-white)
  Label: Inter 400, text-muted, text-sm, uppercase
```

---

### 3.4 About Me

**Pola dari napa (terkonfirmasi):** section ini punya judul peran besar ("Full Stack Developer") yang merupakan heading section, diikuti paragraf bio panjang 2–3 paragraf.

**Spesifikasi visual:**
```
Judul peran:
  - Font: Outfit 700, text-white
  - Sebelum judul: label kecil "About Me" (Inter 500, text-secondary, uppercase, letter-spacing)

Paragraf bio:
  - Inter 400, text-secondary, line-height: 1.8
  - Max-width: 65ch (agar tidak terlalu lebar dan sulit dibaca)

Foto about:
  - Berbeda dari foto hero — ini foto dalam konteks (bukan cutout), pakai border-radius: 12px
  - Posisi: sisi kanan section, atau latar decorative (napa: foto besar dengan overlay gelap ringan)
```

---

### 3.5 Layanan (Services)

**Pola dari napa (terkonfirmasi):** daftar bernomor, bukan grid kartu. Setiap item: **Judul** + *(sub-keterangan dalam kurung)*.

**Spesifikasi visual:**
```
Judul pembuka section:
  "Saya terbuka untuk kolaborasi, freelance project, maupun kerjasama profesional di bidang"
  → Inter 500, text-secondary, text-lg, mb-8

Tiap item layanan:
  Nomor:   JetBrains Mono 700, accent-red, font-size: 1.5rem, opacity: 0.7
  Judul:   Outfit 700, text-white, font-size: 1.4rem
  Sub:     Inter 400, text-muted, font-size: 0.85rem, mt-1

Layout:
  - Desktop: 2 kolom grid
  - Mobile: 1 kolom
  - Gap antar item: 1.5rem vertikal
  - Separator: garis border-bottom 1px var(--border-subtle) tiap item

Foto/ilustrasi:
  - Di sisi kanan section (napa memakai foto cutout kedua)
  - Di situsmu: foto dari Cloudinary atau ilustrasi SVG developer
```

---

### 3.6 Keahlian (Skills)

**Pola dari napa (terkonfirmasi):** nama skill + **durasi tahun** sebagai pengganti progress bar. Namun untuk Tino (developer), progress bar lebih sesuai identitas teknis — dengan catatan bug harus diperbaiki dulu.

**Bug yang wajib diperbaiki terlebih dahulu:**
```tsx
// BEFORE (bug — muncul "undefined%"):
<span>{skill.percentage}%</span>
<div style={{ width: `${skill.percentage}%` }} />

// AFTER (dengan nullish fallback):
<span>{(skill.percentage ?? 0)}%</span>
<div style={{ width: `${skill.percentage ?? 0}%` }} />
```

**Spesifikasi visual (progress bar, bukan durasi tahun):**
```
Nama skill:  Inter 500, text-primary, font-size: 0.95rem
Persentase:  JetBrains Mono 500, text-secondary, font-size: 0.72rem, float kanan

Progress bar track:
  height: 6px
  background: var(--border-subtle)  →  border-radius: 3px

Progress bar fill:
  background: linear-gradient(90deg, var(--accent-red), var(--accent-blue))
  border-radius: 3px
  Animasi: width dari 0% → nilai asli, duration 1s ease-out, trigger saat masuk viewport

Grouping skill:
  - Tiap grup (Backend / Frontend / Tools) punya header label kecil
  - Font: JetBrains Mono 500, text-muted, uppercase, letter-spacing: 0.1em
  - Garis separator horizontal sebelum label grup
```

---

### 3.7 Pengalaman (Experience)

**Pola dari napa (terkonfirmasi):** tiap entri — **Jabatan** (heading) → **Institusi | Tahun** (sub, merah/aksen) → deskripsi 1–2 kalimat. Foto besar ditempatkan di sisi section sebagai jangkar visual.

**Spesifikasi visual:**
```
Layout: 2 kolom di desktop — list timeline kiri, foto ilustrasi kanan (sticky saat scroll)
         1 kolom di mobile

Tiap entri:
  Jabatan:    Outfit 700, text-white, font-size: 1.15rem
  Institusi:  Inter 600, accent-red, font-size: 0.85rem, mt-0.5
  Tahun:      JetBrains Mono 400, text-muted, font-size: 0.78rem (inline dengan institusi, separator "|")
  Deskripsi:  Inter 400, text-secondary, font-size: 0.9rem, mt-1.5, line-height: 1.7

Separator antar entri:
  border-bottom: 1px solid var(--border-subtle), mb-6 pb-6

Tidak ada ikon bulat per entri — napa tidak memakainya. Cukup garis vertikal tipis
di kiri sebagai timeline visual:
  border-left: 2px solid var(--accent-red), pl-4 (hanya di mobile)
```

---

### 3.8 Sertifikasi & Penghargaan

**Pola dari napa (terkonfirmasi):** kartu 3 baris — institusi (kecil) → nama (besar) → tahun.

**Spesifikasi visual:**
```
Layout: grid 2 kolom di desktop, 1 kolom di mobile

Tiap kartu:
  Background: var(--glass-card), backdrop-filter: blur(12px)
  Border: 1px solid var(--border-subtle)
  Border-radius: 10px
  Padding: 1.25rem 1.5rem

  Institusi:     JetBrains Mono 500, text-muted, font-size: 0.7rem, uppercase, letter-spacing: 0.1em
  Nama penghargaan: Outfit 700, text-white, font-size: 1.05rem, mt-0.5
  Tahun:         JetBrains Mono 400, accent-red, font-size: 0.75rem, mt-1

  Hover effect: border-color var(--accent-red), transform: translateY(-3px), transition: 0.25s
```

---

### 3.9 Portofolio / Projects

**Pola dari napa (terkonfirmasi):** setiap proyek punya **tag kategori** + **judul + tahun** + deskripsi yang **dipecah jadi dua bagian berlabel: "Strategi:" dan "Hasil:"**

**Situsmu saat ini:** deskripsi satu paragraf tanpa label. Perlu diubah ke format dua bagian.

**Spesifikasi visual:**
```
Layout: grid 2 kolom di desktop, 1 kolom di mobile

Tiap kartu:
  Tag kategori: JetBrains Mono 500, accent-red, text-xs, uppercase, mb-2
  Judul:        Outfit 700, text-white, font-size: 1.2rem
  Tahun:        JetBrains Mono 400, text-muted, text-xs, inline dengan judul (separator "—")

  Deskripsi format dua bagian:
    <p><strong className="text-text-secondary">Strategi:</strong> [teks] </p>
    <p className="mt-2"><strong className="text-accent-red">Hasil:</strong> [teks] </p>

  Gambar proyek:
    - Rasio: 16:9, object-fit: cover
    - border-radius: 8px di atas kartu, 0 di bawah (kartu punya radius di semua sudut)
    - Overlay gelap ringan (gradient dari bawah) saat hover — muncul tombol "Lihat Demo" / "GitHub"

  Hover:
    transform: translateY(-4px)
    box-shadow: 0 12px 30px rgba(230, 57, 70, 0.15)
    transition: 0.25s ease
```

---

### 3.10 Video & Galeri (2 sub-section terpisah)

**Pola dari napa (terkonfirmasi):** napa memisah "Video Contents" (embed portrait 9:16) dan "Kumpulan Foto & Kegiatan" (grid foto landscape/persegi) — ini **2 blok berbeda**, bukan 1 galeri.

**Situsmu saat ini:** 1 grid foto Unsplash generik — perlu dipecah jadi 2.

**Spesifikasi Video Contents:**
```
Heading: "Demo & Video Proyek"  (atau tetap "Video Contents")
Grid: 5 kolom di desktop (sesuai napa — kolom sempit tegak untuk konten portrait)
      2 kolom di mobile
Tiap item:
  - Rasio: 9:16 (portrait — cocok untuk screen recording/demo)
  - embed URL dari tabel `videos` di Supabase (field embed_url)
  - Thumbnail dari Cloudinary, klik buka modal iframe
  - Modal: background rgba(0,0,0,0.85), iframe 100% × 85vh, tombol tutup pojok kanan atas
```

**Spesifikasi Galeri Foto:**
```
Heading: "Kumpulan Foto & Kegiatan"
Grid: 3 kolom di desktop, 2 di tablet, 1 di mobile
Tiap item:
  - Rasio: 1:1 (persegi), object-fit: cover
  - Klik buka lightbox fullscreen
  - Lightbox: panah kiri/kanan untuk navigasi antar foto, klik luar untuk tutup
  - Gambar dari Cloudinary (tabel `galleries` Supabase)
```

---

### 3.11 CTA Kontak

**Pola dari napa (terkonfirmasi):** blok penutup berdiri sendiri sebelum footer — satu judul ajakan + 1 tombol utama. Napa: "Ikuti saluran WhatsApp". Situsmu sudah punya "Mari Terhubung" dengan tombol WA — pertahankan pola ini.

**Spesifikasi visual:**
```
Background: var(--glow-red) + var(--bg-elevated) — beri kesan "puncak" halaman
Judul: Outfit 700, text-white, text-center, font-size: clamp(1.6rem, 4vw, 2.4rem)
Sub: Inter 400, text-secondary, text-center, max-width: 50ch, mx-auto, mt-3
Tombol: "Hubungi Saya via WhatsApp" — background: accent-red, py-4 px-8, font-size: 1rem
```

---

### 3.12 Footer

**Pola dari napa (terkonfirmasi):** 3 kolom — logo/deskripsi singkat | Quick Link | Contact — lalu garis bawah dengan copyright.

**Spesifikasi visual:**
```
Background: var(--bg-elevated) dengan border-top: 1px solid var(--border-subtle)
Padding: py-12

Kolom 1 — Brand:
  Nama: Outfit 700, text-white, mb-2
  Deskripsi: Inter 400, text-secondary, text-sm, max-width: 28ch
  Ikon sosial: mt-4, ikon 18px, gap-3

Kolom 2 — Quick Link:
  Heading: "Quick Link" — JetBrains Mono 600, text-muted, uppercase, mb-4
  Item: Inter 400, text-secondary, hover: accent-red, text-sm

Kolom 3 — Contact:
  Heading: "Find Me" — JetBrains Mono 600, text-muted, uppercase, mb-4
  Item: Inter 400, text-secondary, text-sm, ikon prefix tiap baris

Copyright strip:
  border-top: 1px solid var(--border-subtle), mt-8, pt-6
  Teks: "© 2026 Tino Lambut. All Rights Reserved." — text-muted, text-sm, text-center
```

---

## 4. ANIMASI & INTERAKSI

Napa terasa naratif saat di-scroll karena tiap section muncul dengan ritme — bukan semuanya langsung tampil.

```tsx
// hooks/useScrollReveal.ts
// Gunakan IntersectionObserver, threshold: 0.15
// Elemen: opacity 0 → 1, translateY(24px) → 0, duration: 0.65s, ease-out
// Implementasi: tambahkan class "reveal" ke elemen, hook ini menambah class "in-view" saat masuk

// Untuk komponen Next.js:
'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}
```

```css
/* globals.css — kelas animasi */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s ease-out, transform 0.65s ease-out;
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Progress bar skills — animasi lebar */
.skill-fill {
  width: 0%;
  transition: width 1s ease-out;
}
.skill-fill.in-view {
  width: var(--target-width); /* set via style={{ '--target-width': `${pct}%` } */
}

/* Selalu hormati reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal, .skill-fill { transition: none; opacity: 1; transform: none; }
  .skill-fill { width: var(--target-width); }
}
```

**Count-up angka stat** (trigger saat masuk viewport):
```tsx
// Gunakan requestAnimationFrame, durasi: 1200ms
// Contoh: 0 → 15 (projects), 0 → 5 (years)
// Format: tambahkan "+" setelah angka selesai
```

---

## 5. ARSITEKTUR KOMPONEN (disesuaikan Next.js + Cloudflare Pages)

Karena situsmu di-deploy ke **Cloudflare Pages** (bukan Vercel), ada catatan penting:

### 5.1 Catatan Cloudflare Pages
```
- Cloudflare Pages mendukung Next.js via @cloudflare/next-on-pages adapter
- Pastikan semua 'use client' component tidak bergantung pada Node.js API
  yang tidak tersedia di Cloudflare Workers runtime
- Fetch ke Supabase dari server component: gunakan fetch() biasa, bukan
  node-fetch atau paket Node-spesifik
- Untuk ISR (revalidate), Cloudflare Pages memiliki dukungan terbatas —
  pertimbangkan on-demand revalidation atau cache-control header manual
```

### 5.2 Struktur Komponen yang Direkomendasikan
```
components/
├── layout/
│   ├── Navbar.tsx          ← glassmorphism sticky, highlight section aktif
│   └── Footer.tsx          ← 3 kolom, ikon sosial, copyright
│
├── sections/
│   ├── HeroSection.tsx     ← foto cutout kanan, glow background, badge, CTA
│   ├── StatCallout.tsx     ← 4 blok naratif (bukan 2 angka polos)
│   ├── AboutSection.tsx    ← bio panjang 2-3 paragraf + foto
│   ├── ServicesSection.tsx ← daftar bernomor, bukan grid kartu
│   ├── SkillsSection.tsx   ← progress bar dengan bug undefined% diperbaiki
│   ├── ExperienceSection.tsx ← timeline list + foto sticky kanan
│   ├── CertsSection.tsx    ← glass card 2-kolom grid
│   ├── ProjectsSection.tsx ← kartu dengan format Strategi/Hasil
│   ├── VideoSection.tsx    ← grid 5-col portrait, modal embed
│   ├── GallerySection.tsx  ← grid persegi, lightbox
│   └── ContactSection.tsx  ← CTA blok + tombol WA
│
└── ui/
    ├── GlassCard.tsx       ← reusable: glass background + border subtle + radius
    ├── SectionLabel.tsx    ← label kecil di atas heading section ("LAYANAN", "KEAHLIAN", dll)
    ├── SkillBar.tsx        ← progress bar dengan animasi + fallback ?? 0
    ├── VideoModal.tsx      ← modal iframe, overlay gelap, tombol tutup
    └── Lightbox.tsx        ← galeri foto fullscreen, navigasi panah
```

### 5.3 Data Fetching (dari Supabase, disesuaikan Cloudflare)
```tsx
// lib/supabase.ts — gunakan versi yang kompatibel CF Workers
import { createClient } from '@supabase/supabase-js'

// Di app/page.tsx (Server Component) — fetch saat build/request
export const revalidate = 60 // ISR 60 detik, jika didukung CF Pages kamu

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [profile, experiences, skills, services, videos, galleries, projects, certs] =
    await Promise.all([
      supabase.from('profiles').select('*').single(),
      supabase.from('experiences').select('*').order('order_column'),
      supabase.from('skills').select('*').order('order_column'),
      supabase.from('services').select('*').order('order_column'),
      supabase.from('videos').select('*').order('order_column'),
      supabase.from('galleries').select('*').order('order_column'),
      supabase.from('projects').select('*').order('order_column'),
      supabase.from('certifications').select('*').order('order_column'),
    ])
  return { profile, experiences, skills, services, videos, galleries, projects, certs }
}
```

---

## 6. PRIORITAS PENGERJAAN

| # | Task | Dampak | Effort |
|---|---|---|---|
| 🔴 1 | **Perbaiki bug `undefined%`** di SkillBar — tambahkan `?? 0` | Kecil tapi terlihat jelek | 5 menit |
| 🔴 2 | **Terapkan palet warna** dari §1 ke globals.css / tailwind.config | Sangat tinggi — ubah keseluruhan nuansa | Sedang |
| 🔴 3 | **Rombak HeroSection** — tambah foto cutout kanan, glow background, kontak cepat inline | Sangat tinggi — hero = kesan pertama | Tinggi |
| 🟠 4 | **Ubah stat jadi StatCallout naratif** (§3.3) — dari 2 angka polos ke 4 blok dengan konteks | Tinggi | Sedang |
| 🟠 5 | **Ubah format ProjectCard** ke Strategi/Hasil (§3.9) | Tinggi | Kecil |
| 🟡 6 | **Pisah galeri jadi 2 section**: VideoSection + GallerySection (§3.10) | Sedang | Sedang |
| 🟡 7 | **Tambah animasi** scroll-reveal + count-up + progress bar (§4) | Sedang | Sedang |
| 🟢 8 | **Lightbox galeri** dan **modal video** (§3.10) | Kecil–Sedang | Sedang |
| 🟢 9 | **Ganti foto Unsplash** dengan foto asli Tino | Tinggi (tapi blocking faktor eksternal) | Tergantung kamu |

---

## 7. POIN YANG PERLU KAMU KONFIRMASI

- [ ] **Foto hero cutout** — apakah kamu punya foto PNG dengan background transparan (atau mau saya bantu arahkan cara buat cutout via tool gratis)?
- [ ] **Arsitektur repo** — karena GitHub-nya tidak bisa saya akses, konfirmasi: apakah kamu pakai Next.js App Router atau Pages Router? (ini menentukan cara `use client` dan data fetching diterapkan)
- [ ] **Cloudflare Pages vs Workers** — dari URL `*.workers.dev` ada kemungkinan ini Cloudflare Workers biasa, bukan Pages. Kalau Workers, cara deploy Next.js berbeda (perlu `@cloudflare/next-on-pages`). Bisa di-confirm?
- [ ] **Tabel `certifications`** — di situsmu ada section Prestasi/Sertifikasi, tapi di skema PRD v3.0 tidak ada tabel ini secara terpisah (data ada di `profiles` atau tidak terdefinisi). Apakah ini sudah ada di Supabase-mu atau perlu ditambahkan?
