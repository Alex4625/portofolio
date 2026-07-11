export type FieldKind = "text" | "textarea" | "number" | "date" | "url" | "email" | "checkbox" | "file" | "json";

export type ResourceConfig = {
  title: string;
  description: string;
  table: string;
  path: string;
  files: Record<string, string>;
  fields: Record<string, FieldKind>;
  labels: Record<string, string>;
  summary: string[];
};

export const resourceConfigs: Record<string, ResourceConfig> = {
  services: {
    title: "Services",
    description: "Kelola layanan yang tampil di section publik.",
    table: "services",
    path: "/admin/services",
    files: {},
    fields: { title: "text", description: "textarea", icon: "text", order_column: "number", order_num: "number", is_published: "checkbox" },
    labels: { title: "Judul", description: "Deskripsi", icon: "Ikon", order_column: "Urutan", order_num: "Nomor", is_published: "Published" },
    summary: ["title", "description"],
  },
  skills: {
    title: "Skills",
    description: "Kelola keahlian, kategori, icon, dan persentase progress.",
    table: "skills",
    path: "/admin/skills",
    files: { icon_image: "skills" },
    fields: { name: "text", category: "text", percentage: "number", value: "text", order_column: "number", is_published: "checkbox" },
    labels: { name: "Nama", category: "Kategori", percentage: "Persentase", value: "Level", icon_image: "Icon", order_column: "Urutan", is_published: "Published" },
    summary: ["name", "category"],
  },
  experiences: {
    title: "Experience",
    description: "Kelola timeline pengalaman kerja dan proyek profesional.",
    table: "experiences",
    path: "/admin/experiences",
    files: {},
    fields: { role: "text", title: "text", company: "text", company_name: "text", start_date: "date", end_date: "date", description: "textarea", order_column: "number", is_published: "checkbox" },
    labels: { role: "Jabatan", title: "Judul Legacy", company: "Perusahaan", company_name: "Perusahaan Legacy", start_date: "Mulai", end_date: "Selesai", description: "Deskripsi", order_column: "Urutan", is_published: "Published" },
    summary: ["role", "company"],
  },
  certifications: {
    title: "Certifications",
    description: "Kelola sertifikasi, penghargaan, dan credential.",
    table: "certifications",
    path: "/admin/certifications",
    files: {},
    fields: { organization: "text", org: "text", title: "text", name: "text", year: "text", credential_url: "url", order_column: "number", is_published: "checkbox" },
    labels: { organization: "Institusi", org: "Institusi Legacy", title: "Nama", name: "Nama Legacy", year: "Tahun", credential_url: "Credential URL", order_column: "Urutan", is_published: "Published" },
    summary: ["title", "organization"],
  },
  projects: {
    title: "Projects",
    description: "Kelola portofolio, strategi, hasil, teknologi, dan link proyek.",
    table: "projects",
    path: "/admin/projects",
    files: { image_path: "projects" },
    fields: {
      title: "text",
      category: "text",
      year: "text",
      description: "textarea",
      strategy: "textarea",
      result: "textarea",
      technologies: "text",
      tech_stack: "json",
      github_url: "url",
      demo_url: "url",
      url: "url",
      order_column: "number",
      is_featured: "checkbox",
      is_published: "checkbox",
    },
    labels: { title: "Judul", category: "Kategori", year: "Tahun", description: "Deskripsi Legacy", strategy: "Strategi", result: "Hasil", technologies: "Teknologi", tech_stack: "Tech Stack", image_path: "Gambar", github_url: "GitHub", demo_url: "Demo", url: "URL Legacy", order_column: "Urutan", is_featured: "Featured", is_published: "Published" },
    summary: ["title", "category"],
  },
  videos: {
    title: "Videos",
    description: "Kelola demo video portrait dan embed URL.",
    table: "videos",
    path: "/admin/videos",
    files: { thumbnail_image: "videos" },
    fields: { title: "text", embed_url: "url", order_column: "number", is_published: "checkbox" },
    labels: { title: "Judul", embed_url: "Embed URL", thumbnail_image: "Thumbnail", order_column: "Urutan", is_published: "Published" },
    summary: ["title", "embed_url"],
  },
  galleries: {
    title: "Gallery",
    description: "Kelola foto kegiatan dan dokumentasi.",
    table: "galleries",
    path: "/admin/galleries",
    files: { image_path: "galleries" },
    fields: { title: "text", caption: "textarea", order_column: "number", is_published: "checkbox" },
    labels: { title: "Judul", caption: "Caption", image_path: "Foto", order_column: "Urutan", is_published: "Published" },
    summary: ["title", "caption"],
  },
};
