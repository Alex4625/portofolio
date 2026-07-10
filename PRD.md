# PRD & DESIGN SYSTEM — PORTOFOLIO Dynamic
Versi: 4.0 | Tanggal: 10 Juli 2026 | Status: Draft — Migrasi Stack

> **Ringkasan eksekutif (3 baris):** Web **PORTOFOLIO** tetap berjalan di atas **Laravel 12 + Filament PHP v4**, namun infrastrukturnya ditingkatkan: database menggunakan **Supabase Postgres**, penyimpanan file (storage) pindah ke **Cloudflare R2**, dan peluncuran (deploy) memanfaatkan ekosistem **Cloudflare**. Struktur konten publik dibungkus dalam sistem desain **"Tech Blueprint"** (latar gelap + tipografi monospace + gaya cetak-biru teknik). Admin tetap mengelola semua konten secara dinamis lewat panel Filament di `/admin`.

---

## 1. RINGKASAN EKSEKUTIF

### 1.1 Deskripsi Project
**PORTOFOLIO** adalah platform web *full-stack* yang berfungsi ganda: portofolio publik profesional dan Content Management System (CMS) pribadi. Versi 4.0 ini memperkuat lapisan infrastruktur cloud: MySQL lokal diganti dengan **Supabase Postgres**, dan disk storage lokal diganti dengan penyimpanan **Cloudflare R2** (S3-compatible API). Platform ini didesain agar siap di-*deploy* ke dalam ekosistem **Cloudflare** dengan manajemen data mandiri tanpa harus menyentuh kode.

### 1.2 Masalah yang Diselesaikan
- Keterikatan pada *local machine* (XAMPP/MySQL) menyulitkan *deployment* produksi.
- Update konten perlu dilakukan dengan cepat dan langsung tayang tanpa *rebuild/redeploy* kodingan.
- Butuh infrastruktur kelas dunia yang gratis atau murah: Supabase dan Cloudflare memberikan batas gratis (*free tier*) yang sangat longgar untuk portofolio developer.

### 1.3 Solusi yang Ditawarkan
Laravel tetap menjadi *application layer* utama. Laravel terhubung ke **Supabase** via *connection string* Postgres standar dan ke **Cloudflare R2** menggunakan API S3 Laravel (`league/flysystem-aws-s3-v3`). Panel Admin Filament mengatur CRUD. Identitas visual menggunakan **Tech Blueprint**: latar gelap dengan *glow accent*, grid tipis, garis-anotasi, nomor revisi, meniru gaya gambar kerja (blueprint).

### 1.4 Target Pengguna
| Pengguna | Kebutuhan |
|---|---|
| **Admin** | Kelola seluruh konten situs (CRUD) tanpa kode, unggah gambar/CV ke Cloudflare R2. |
| **Pengunjung Publik** | Menilai kredibilitas teknis pemilik portofolio lewat UI interaktif bergaya Tech Blueprint. |

### 1.5 Asumsi & Batasan
- **Cloudflare R2** dipakai untuk *seluruh* aset media (foto profil, thumbnail video, galeri, ikon skill, CV PDF), menggantikan Cloudinary dari rencana sebelumnya.
- **Supabase** dipakai murni sebagai *hosted Postgres* (tidak memakai SDK JS Supabase).
- **Deployment via Cloudflare**: Akan memanfaatkan ekosistem Cloudflare (seperti proksi DNS, caching CDN, dan/atau Cloudflare Pages dengan *server-side rendering* jika dimungkinkan oleh adapter pihak ketiga, atau VPS biasa di balik Cloudflare CDN).
- **Nama Web**: "PORTOFOLIO".

---

## 2. TUJUAN & METRIK KEBERHASILAN

| Tujuan | Metrik | Target |
|---|---|---|
| Hosting tangguh & murah | Biaya hosting bulanan | Mendekati Rp 0 (Supabase Free + Cloudflare R2 Free) |
| Kemudahan Update | Waktu dari ide → tayang di publik | < 5 menit lewat `/admin` |
| Performa global | Lighthouse Score | ≥ 90 (terbantu oleh Cloudflare CDN) |

---

## 3. USER ROLES & PERMISSION

| Role | Deskripsi | Akses Utama |
|---|---|---|
| **Admin** | Pemilik portofolio | Login `/admin`, CRUD penuh ke tabel, unggah media ke Cloudflare R2. |
| **Public Visitor** | Siapa pun tanpa login | Baca-saja seluruh halaman publik, unduh CV PDF. |

---

## 4. USER STORIES

### Modul: Halaman Publik
- [ ] US-001: Pengunjung melihat *hero section* (badge peran, foto, tombol kontak). Foto diambil dari ember (bucket) Cloudflare R2.
- [ ] US-002: Pengunjung melihat animasi statistik (*count-up*) jam terbang developer.
- [ ] US-003: Pengunjung melihat linimasa pengalaman kerja (*Experiences*) bergaya catatan revisi teknik.
- [ ] US-004: Pengunjung melihat daftar *skill* berbentuk penggaris ukur (*ruler bar*).
- [ ] US-005: Pengunjung menonton video YouTube/TikTok langsung via *embed*.
- [ ] US-006: Pengunjung melihat galeri dokumentasi/acara.
- [ ] US-007: Pengunjung melihat daftar *featured projects* dengan badge teknologi dan link GitHub/Demo.
- [ ] US-008: Pengunjung mengunduh CV PDF langsung dari URL Cloudflare R2.

### Modul: CMS Admin (`/admin`)
- [ ] US-009: Admin login dengan autentikasi standar Laravel (bukan Supabase Auth).
- [ ] US-010: Admin mengatur data profil di halaman *singleton* terpusat.
- [ ] US-011: Admin mengatur Experiences, Services, Videos, Galleries, Projects. Upload media dari form ini otomatis dikirim ke Cloudflare R2 via API S3 Laravel.

---

## 5. ARSITEKTUR SISTEM

### Gambaran Umum Arsitektur
```text
                 ┌───────────────────────────────┐
   Pengunjung →  │   Laravel 12 (Blade + Filament) │ ← Di-deploy dalam ekosistem
   & Admin       │   routing, Eloquent, /admin   │   Cloudflare
                 └───────────────┬─────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      [ Supabase Postgres ]             [ Cloudflare R2 ]
      DB_CONNECTION=pgsql               Filesystem 's3' (AWS S3-compatible)
```

### Technology Stack
- **Framework:** Laravel 12
- **Admin Panel:** Filament PHP v4
- **UI/Styling:** Tailwind CSS v4 (via Vite)
- **Database:** Supabase Postgres
- **Media Storage:** Cloudflare R2 (via `league/flysystem-aws-s3-v3`)
- **Deployment:** Cloudflare (CDN, Proksi DNS, Storage)

---

## 6. DESAIN DATABASE (SUPABASE POSTGRES)
*Setiap Model disetel dengan `$guarded = [];` dan `$table->uuid('id')->primary()`.*

1. **`profiles`** (Singleton): `full_name`, `profession`, `hero_badge`, `about_text`, `hero_image`, `cv_pdf_path`, `stats_json` (JSONB).
2. **`experiences`**: `company_name`, `role`, `start_date`, `end_date`, `description`, `order_column`.
3. **`services`**: `title`, `description`, `icon`, `order_column`.
4. **`skills`**: `name`, `category`, `percentage`, `icon_image`.
5. **`videos`**: `title`, `thumbnail_image`, `embed_url`, `order_column`.
6. **`galleries`**: `image_path`, `caption`, `order_column`.
7. **`projects`**: `title`, `description`, `image_path`, `tech_stack` (JSONB), `github_url`, `demo_url`, `is_featured`.

---

## 7. PROMPT IMPLEMENTASI INFRASTRUKTUR

### Setup Database Supabase & Cloudflare R2
```text
1. Update .env:
   DB_CONNECTION=pgsql
   DB_HOST=[Supabase Host]
   DB_PORT=5432
   DB_DATABASE=postgres
   DB_USERNAME=postgres
   DB_PASSWORD=[Supabase Password]
   DB_SSLMODE=require

2. Install S3 Driver untuk Cloudflare R2:
   composer require league/flysystem-aws-s3-v3

3. Update .env untuk Cloudflare R2:
   AWS_ACCESS_KEY_ID=[R2 Access Key]
   AWS_SECRET_ACCESS_KEY=[R2 Secret Key]
   AWS_DEFAULT_REGION=auto
   AWS_BUCKET=[R2 Bucket Name]
   AWS_URL=[R2 Custom Domain atau R2.dev URL]
   AWS_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

4. Update config/filesystems.php:
   Pastikan disk 's3' menggunakan env variables tersebut, 
   tambahkan `'use_path_style_endpoint' => true` jika perlu.

5. Pada Filament Resource:
   Semua FileUpload::make() dikonfigurasikan dengan ->disk('s3').
```
