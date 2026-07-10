<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Service;
use App\Models\Video;
use App\Models\Gallery;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Clear old data to prevent duplication

        User::truncate();
        Profile::truncate();
        Skill::truncate();
        Experience::truncate();
        Service::truncate();
        Video::truncate();
        Gallery::truncate();
        Project::truncate();


        // 1. User
        User::create([
            'name' => 'Tino Lambut',
            'email' => 'admin@tinolambut.dev',
            'password' => Hash::make('password'),
        ]);

        // 2. Profile
        Profile::create([
            'full_name' => 'Tino Lambut',
            'profession' => 'Full Stack Web Developer',
            'hero_badge' => 'Full Stack Developer',
            'about_text' => '<p>Saya adalah seorang Full Stack Web Developer yang sangat berdedikasi dalam menulis kode yang bersih, efisien, dan dapat diandalkan. Fokus utama saya adalah membangun aplikasi web modern berskala besar menggunakan ekosistem Laravel dan Vue/React.</p>',
            'github_url' => 'https://github.com/tinolambut',
            'instagram_url' => 'https://instagram.com/tinolambut',
            'youtube_url' => 'https://youtube.com/@tinolambut',
            'years_of_experience' => '3+',
            'projects_completed' => '20+',
            'stats_json' => [
                '50K+' => 'Lines of Code',
                '20+' => 'Projects Deployed',
                '100+' => 'Cups of Coffee',
            ]
        ]);

        // 3. Experiences
        Experience::create([
            'company_name' => 'Tech Solutions Indonesia',
            'role' => 'Backend Developer',
            'start_date' => 'Jan 2023',
            'end_date' => 'Present',
            'description' => '<p>Bertanggung jawab dalam merancang arsitektur API menggunakan Laravel, mengoptimalkan query MySQL, dan mengintegrasikan layanan pihak ketiga seperti Payment Gateway.</p>',
            'order_column' => 1
        ]);
        Experience::create([
            'company_name' => 'Freelance',
            'role' => 'Web Developer',
            'start_date' => 'Mar 2021',
            'end_date' => 'Des 2022',
            'description' => '<p>Membangun berbagai website company profile dan sistem informasi manajemen untuk klien lokal menggunakan PHP dan Tailwind CSS.</p>',
            'order_column' => 2
        ]);

        // 4. Services
        Service::create([
            'title' => 'Web Application Development',
            'description' => 'Membangun aplikasi web kustom yang scalable dan aman sesuai kebutuhan bisnis Anda dari nol.',
            'order_column' => 1
        ]);
        Service::create([
            'title' => 'RESTful API Design',
            'description' => 'Merancang dan mengimplementasikan API yang cepat dan terdokumentasi dengan baik untuk aplikasi mobile/web.',
            'order_column' => 2
        ]);
        Service::create([
            'title' => 'UI/UX Implementation',
            'description' => 'Menerjemahkan desain figma ke dalam kode HTML/CSS/JS yang responsif dan interaktif (Pixel Perfect).',
            'order_column' => 3
        ]);

        // 5. Skills (Technical & Tools)
        $skills = [
            ['name' => 'PHP / Laravel', 'category' => 'Backend', 'percentage' => 90],
            ['name' => 'MySQL / PostgreSQL', 'category' => 'Database', 'percentage' => 85],
            ['name' => 'JavaScript / Vue.js', 'category' => 'Frontend', 'percentage' => 80],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'percentage' => 95],
        ];
        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        $tools = [
            'VS Code', 'Git / GitHub', 'Postman', 'Docker', 'Figma'
        ];
        foreach ($tools as $tool) {
            Skill::create([
                'name' => $tool,
                'category' => 'Tools & Software',
                'percentage' => null
            ]);
        }

        // 6. Videos (Tech Demos / Tutorials)
        Video::create([
            'title' => 'Laravel 12 New Features Overview',
            'embed_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            'order_column' => 1
        ]);
        Video::create([
            'title' => 'Building API with Filament v4',
            'embed_url' => null,
            'order_column' => 2
        ]);

        // 7. Projects
        Project::create([
            'title' => 'Sistem Informasi Manajemen Sekolah',
            'description' => '<p>Platform untuk mengelola data siswa, absensi, dan nilai akademik secara real-time.</p>',
            'image_path' => 'projects/placeholder.jpg',
            'tech_stack' => ['Laravel', 'MySQL', 'Tailwind', 'AlpineJS'],
            'github_url' => 'https://github.com/tinolambut/sim-sekolah',
            'is_featured' => true
        ]);
    }
}
