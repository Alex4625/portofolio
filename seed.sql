-- Insert Site Config
INSERT INTO site_config (id, full_name, role, about, avatar_url, contact_email, whatsapp_number, github_url, stats_json) VALUES (
  'main',
  'Alexander Noventino Lambut',
  'Mahasiswa Informatika & Aspiring Full Stack Developer',
  'Mahasiswa Informatika — Manajemen Data dan Informasi yang antusias dalam membangun aplikasi web modern. Saya senang mengeksplorasi teknologi baru, dari frontend hingga backend, dan terus mengasah kemampuan melalui proyek-proyek nyata selama masa kuliah.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
  'halo@alexander.com',
  '6281234567890',
  'https://github.com/Alex4625',
  '[{"label":"Semester Aktif","value":"6+"},{"label":"Projects Dibuat","value":"10+"},{"label":"Teknologi Dikuasai","value":"8+"}]'
);

-- Insert Educations
INSERT INTO educations (id, degree, school, year, description, order_index) VALUES 
('edu-1', 'S1 Informatika — Manajemen Data dan Informasi', 'Universitas', '2022 - Sekarang', 'Fokus pada pengelolaan sistem informasi, analisis data, dan pengembangan perangkat lunak modern.', 1),
('edu-2', 'Ilmu Pengetahuan Alam (IPA)', 'Sekolah Menengah Atas (SMA)', '2019 - 2022', 'Aktif dalam olimpiade sains dan ekstrakurikuler teknologi informasi.', 2),
('edu-3', 'Pendidikan Dasar Menengah', 'Sekolah Menengah Pertama (SMP)', '2016 - 2019', 'Berprestasi dalam bidang akademik dan mulai mengenal dasar-dasar pemrograman.', 3),
('edu-4', 'Pendidikan Dasar', 'Sekolah Dasar (SD)', '2010 - 2016', 'Membangun fondasi logika dan matematika yang kuat sejak dini.', 4);

-- Insert Services
INSERT INTO services (id, title, description, icon_name, order_index) VALUES 
('srv-1', 'Web Development', 'Membangun website modern dan responsif menggunakan Next.js, React, dan teknologi web terkini.', 'code', 1),
('srv-2', 'UI/UX Design', 'Merancang antarmuka pengguna yang intuitif dan elegan dengan pendekatan user-centered design.', 'layout', 2),
('srv-3', 'Data & Information Management', 'Mengelola dan menganalisis data menggunakan database modern serta menyajikan insight yang bermakna.', 'message-square', 3);

-- Insert Portfolios
INSERT INTO portfolios (id, title, description, media_url, is_video, tech_stack_json, order_index) VALUES 
('prt-1', 'E-Commerce Replatforming', 'Meningkatkan konversi penjualan hingga 40% melalui desain ulang dan optimasi performa web.', 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2000&auto=format&fit=crop', 0, '["Next.js","Tailwind CSS","Shopify"]', 1),
('prt-2', 'SaaS Dashboard Analytics', 'Membangun dashboard analitik real-time untuk memantau metrik performa pengguna.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', 0, '["React","TypeScript","Tailwind CSS"]', 2);

-- Insert Galleries
INSERT INTO galleries (id, image_url, caption, order_index) VALUES 
('gal-1', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop', 'Team Collaboration Workspace', 1),
('gal-2', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop', 'Coding setup', 2),
('gal-3', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop', 'Workshop Speaker', 3);
