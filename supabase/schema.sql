create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text,
  full_name text,
  profession text,
  hero_badge text,
  bio text,
  about_text text,
  email text,
  phone text,
  whatsapp_url text,
  location text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  avatar_path text,
  hero_image_path text,
  about_image_path text,
  cv_pdf_path text,
  stats_json jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  order_num integer default 0,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text default 'Tools',
  percentage integer default 0 check (percentage >= 0 and percentage <= 100),
  value text,
  icon_image text,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text,
  title text,
  company text,
  company_name text,
  start_date date,
  end_date date,
  description text,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  organization text,
  org text,
  title text,
  name text,
  year text,
  credential_url text,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  year text,
  description text,
  strategy text,
  result text,
  technologies text,
  tech_stack jsonb default '[]'::jsonb,
  image_path text,
  github_url text,
  demo_url text,
  url text,
  is_featured boolean default false,
  is_published boolean default true,
  order_column integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail_image text,
  embed_url text not null,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists galleries (
  id uuid primary key default gen_random_uuid(),
  image_path text,
  image_url text,
  caption text,
  title text,
  order_column integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists services_order_idx on services (is_published, order_column, order_num);
create index if not exists skills_order_idx on skills (is_published, category, order_column);
create index if not exists experiences_order_idx on experiences (is_published, order_column, start_date desc);
create index if not exists certifications_order_idx on certifications (is_published, order_column, year desc);
create index if not exists projects_order_idx on projects (is_published, is_featured desc, order_column, created_at desc);
create index if not exists videos_order_idx on videos (is_published, order_column, created_at desc);
create index if not exists galleries_order_idx on galleries (is_published, order_column, created_at desc);
