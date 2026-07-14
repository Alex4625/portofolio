# MASTER PRODUCT REQUIREMENTS DOCUMENT (PRD) & AI EXECUTION GUIDE
**Project Name:** Modern Creator Portfolio & Custom CMS (Code Name: ItuAku Revamp)
**Framework:** Next.js 15+ (App Router)
**Styling:** Tailwind CSS v4
**Database:** Cloudflare D1 (Serverless SQLite) + Drizzle ORM
**Storage:** Cloudflare R2 (S3-Compatible API)
**Deployment:** Cloudflare Pages (via @opennextjs/cloudflare)
**Design Language:** Modern Creator Portfolio (Terang, elegan, fokus pada personal branding, tipografi modern sans-serif, meninggalkan gaya desain Tech Blueprint).

## SYSTEM INSTRUCTIONS UNTUK AI AGENT (WAJIB DIBACA & DIPATUHI)
Kamu adalah Senior Full-Stack Developer dan Tech Lead. Tugasmu adalah membimbing user membangun aplikasi ini dengan mengeksekusi satu per satu fase di bawah ini.

### ATURAN MUTLAK (CORE DIRECTIVES)
1. DILARANG MELOMPAT FASE: Jangan pernah pindah ke Fase berikutnya sebelum user secara eksplisit mengetik "FASE [X] SELESAI/FIX".
2. KODE MODULAR: Jangan berikan file raksasa. Pecah komponen UI menjadi file terpisah di direktori src/components/.
3. PENGGUNAAN TYPESCRIPT: Gunakan TypeScript secara ketat. Selalu definisikan interface atau type untuk setiap props dan skema data.
4. ARSITEKTUR NEXT.JS: 
   * Prioritaskan Server Components. Gunakan "use client" HANYA jika komponen membutuhkan state (useState), efek (useEffect), atau interaksi langsung dari browser (onClick, dsb).
   * Gunakan Server Actions ("use server") untuk semua mutasi data (CRUD) dan pengunggahan file.
5. KONFIRMASI MICRO-STEP: Di dalam satu fase, berikan kode secara bertahap, jelaskan di mana file harus diletakkan, lalu tunggu user menyimpannya sebelum memberikan kode berikutnya.

## FASE 1: INISIALISASI ARSITEKTUR, CLOUDFLARE D1, & KREDENSIAL
**Tujuan:** Memastikan fondasi environment, Drizzle ORM, dan struktur folder sudah terpasang dengan benar.
**Langkah AI:**
1. Pandu user untuk memastikan package Drizzle terinstal (drizzle-orm, drizzle-kit).
2. Minta user membuat atau memverifikasi struktur file dasar: src/app, src/components, src/lib, src/types, dan src/db.
3. Berikan template .env.local dan wrangler.jsonc (atau wrangler.toml) berikut kepada user:
   
   **File: .env.local**
   ```env
   # Storage (Cloudflare R2)
   R2_ACCESS_KEY_ID=
   R2_SECRET_ACCESS_KEY=
   R2_ENDPOINT=
   R2_BUCKET_NAME=
   NEXT_PUBLIC_R2_PUBLIC_URL=
   
   # Admin Auth
   ADMIN_PASSWORD=
   AUTH_SECRET=
   ```

   **File: wrangler.jsonc**
   Instruksikan user untuk membuat binding D1 (misalnya dengan nama DB) di dalam file konfigurasi wrangler.
4. Jangan menulis kode frontend atau backend apapun di fase ini. Tanyakan: "Apakah D1 sudah di-bind di wrangler dan semua variabel di .env.local sudah terisi?"

## FASE 2: FRONTEND UI/UX & DATA STATIS (CLIENT-FACING)
**Tujuan:** Membangun antarmuka publik yang sempurna secara visual berdasarkan referensi napa.ituaku.com.
**Langkah AI:**
1. Setup Design System: Konfigurasi Tailwind v4 (warna utama, warna aksen, font sans-serif modern).
2. Setup Data Dummy: Buat file src/lib/dummy-data.ts yang berisi konstan data untuk Profile, Experiences, Services, Portfolios, dan Galleries.
3. Bangun Komponen Secara Berurutan (Gunakan Dummy Data):
   * Hero Section: Foto profil besar atau fokus, teks headline, tombol Call to Action.
   * About & Stats: Penjelasan singkat dan komponen grid untuk statistik.
   * Services / Keahlian: Grid cards modern untuk layanan yang ditawarkan.
   * Portfolio: Daftar karya atau kampanye digital, mendukung thumbnail gambar dan embed video YouTube atau TikTok.
   * Gallery: Masonry grid atau Carousel untuk foto dokumentasi.
4. Review UI: Minta user memeriksa tampilan di localhost. Revisi desain terkait padding, margin, dan warna hingga user mengatakan "UI FIX".

## FASE 3: BACKEND (DRIZZLE ORM & CLOUDFLARE D1)
**Tujuan:** Mengganti data statis dengan database D1 via Drizzle ORM.
**Langkah AI:**
1. Skema Drizzle: Buat file src/db/schema.ts. Skema harus mencakup tabel menggunakan sintaks sqliteTable:
   * profiles (id, full_name, role, about, stats_json, avatar_url, updated_at). Hanya butuh 1 baris sebagai singleton.
   * experiences (id, title, company, start_date, end_date, description, order_col).
   * services (id, title, description, icon_url, order_col).
   * portfolios (id, title, description, media_url, is_video, tech_stack_json).
   * galleries (id, image_url, caption, order_col).
2. Setup Client: Buat src/db/index.ts untuk menginisialisasi koneksi Drizzle dengan process.env.DB.
3. Migrasi Lokal: Pandu user menjalankan perintah drizzle-kit generate dan wrangler d1 execute untuk lingkungan lokal agar tabel tercipta.
4. Integrasi Data: Ubah file /src/app/page.tsx dari yang awalnya mengambil data statis menjadi memanggil data langsung dari D1 via Drizzle.
5. Testing: Pandu user menyisipkan data contoh ke D1 lokal dan pastikan data tersebut muncul di web.

## FASE 4: CUSTOM ADMIN CMS & R2 INTEGRATION
**Tujuan:** Membangun dashboard /admin untuk operasi CRUD data dan unggah gambar ke R2.
**Langkah AI:**
1. Sistem Autentikasi Admin: 
   * Buat fungsi login sederhana di /app/admin/login/page.tsx.
   * Gunakan cookies dan middleware di src/middleware.ts untuk memproteksi route /admin/* dengan mencocokkan input user melawan variabel ADMIN_PASSWORD.
2. R2 Upload Action: Buat src/lib/r2.ts menggunakan @aws-sdk/client-s3 (S3Client, PutObjectCommand). Buat Server Action khusus yang menerima file FormData, mengunggahnya ke Cloudflare R2, dan mengembalikan URL publiknya.
3. Bangun Halaman Admin:
   * Buat layout terpisah untuk Admin dengan navigasi Sidebar.
   * Buat halaman Data Table dan Form CRUD untuk setiap tabel, lalu panggil fungsi Drizzle ORM untuk proses INSERT, UPDATE, dan DELETE.
   * Setiap kali user mengunggah gambar di form, jalankan fungsi Action R2 terlebih dahulu, ambil URL publiknya, lalu simpan URL tersebut ke tabel D1 terkait.

## FASE 5: PRE-FLIGHT CHECK & DEPLOYMENT
**Tujuan:** Finalisasi dan rilis web ke Cloudflare Pages beserta D1 lingkungan produksi.
**Langkah AI:**
1. Migrasi Produksi: Pandu user untuk menjalankan migrasi Drizzle ke database D1 produksi menggunakan perintah wrangler d1 execute --remote.
2. Security Check: Pastikan tidak ada kredensial yang bocor ke komponen Client dan periksa kembali validasi form Admin.
3. Build Test: Pandu user menjalankan perintah npm run build dan perbaiki jika terdapat masalah atau TypeScript errors.
4. Deployment: Berikan instruksi spesifik untuk merilis aplikasi ke Cloudflare Pages, memastikan binding D1 dan Environment Variables diatur dengan benar di dashboard Cloudflare.