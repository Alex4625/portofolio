<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $profile->full_name ?? 'Portfolio' }} - {{ $profile->profession ?? 'Developer' }}</title>
    
    <!-- Fonts: Outfit (Heading), Inter (Body), JetBrains Mono (Blueprint Annotations) -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700|outfit:400,700,800|jetbrains-mono:400,500,700&display=swap" rel="stylesheet" />
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Alpine.js with Intersect Plugin -->
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        :root {
            --bg-navy: #0A1128;
            --line-blue: #BFD7FF;
            --glow-blue: #3B82F6;
            --glow-red: #DC2626;
            --brass: #C9932E;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-navy);
            color: #ffffff;
            /* Blueprint Grid Pattern */
            background-image: 
                linear-gradient(rgba(191, 215, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(191, 215, 255, 0.03) 1px, transparent 1px);
            background-size: 30px 30px;
        }

        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-mono-tech { font-family: 'JetBrains Mono', monospace; }

        .glow-bg {
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(10, 17, 40, 0) 70%);
            z-index: -1;
            border-radius: 50%;
            pointer-events: none;
        }

        .glow-red { background: radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, rgba(10, 17, 40, 0) 70%); }

        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(191, 215, 255, 0.1);
        }

        .blueprint-label {
            color: var(--brass);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        /* Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* Rotating Stamp */
        @keyframes spin-slow {
            100% { transform: rotate(360deg); }
        }
        .stamp-rotate {
            animation: spin-slow 20s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
            .reveal { transition: none; opacity: 1; transform: none; }
            .stamp-rotate { animation: none; }
        }
    </style>
</head>
<body class="antialiased overflow-x-hidden selection:bg-[#DC2626] selection:text-white">

    <!-- Ambient Glows -->
    <div class="glow-bg glow-red top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
    <div class="glow-bg top-1/3 right-0 translate-x-1/3"></div>
    <div class="glow-bg glow-red bottom-0 left-1/4"></div>

    <!-- Fixed Navbar / Header Blueprint -->
    <header class="fixed top-0 w-full z-50 glass-card border-none border-b border-[rgba(191,215,255,0.1)] rounded-none">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <span class="font-heading font-extrabold text-xl tracking-wide text-white">TINO<span class="text-[#3B82F6]">LAMBUT</span></span>
                <span class="font-mono-tech text-[10px] text-[var(--brass)] px-2 py-0.5 border border-[var(--brass)] rounded-sm ml-2 hidden sm:inline-block">v3.0</span>
            </div>

            <nav class="hidden md:flex space-x-8 font-mono-tech text-xs tracking-wider text-gray-400">
                <a href="#about" class="hover:text-[var(--line-blue)] transition-colors">01.ABOUT</a>
                <a href="#skills" class="hover:text-[var(--line-blue)] transition-colors">02.SKILLS</a>
                <a href="#experience" class="hover:text-[var(--line-blue)] transition-colors">03.EXPERIENCE</a>
                <a href="#projects" class="hover:text-[var(--line-blue)] transition-colors">04.PROJECTS</a>
            </nav>

            <div>
                @if($profile && $profile->cv_pdf_path)
                <a href="{{ asset('storage/' . $profile->cv_pdf_path) }}" target="_blank" class="font-mono-tech text-xs px-4 py-2 border border-[var(--line-blue)] text-[var(--line-blue)] hover:bg-[var(--line-blue)] hover:text-[#0A1128] transition-all">
                    [ DOWNLOAD_CV ]
                </a>
                @endif
            </div>
        </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="pt-16">
        
        <!-- SECTION 01: HERO -->
        <section id="hero" class="relative min-h-[90vh] flex items-center border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 01 : HERO</div>
            <div class="absolute top-6 right-6 blueprint-label opacity-50">COORD: 0,0</div>

            <div class="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal" :class="shown ? 'active' : ''">
                <!-- Text Area -->
                <div class="space-y-6">
                    <div class="font-mono-tech text-sm text-[var(--brass)] flex items-center space-x-2">
                        <span>></span>
                        <span class="border-b border-dashed border-[var(--brass)] pb-0.5 uppercase">{{ $profile->hero_badge ?? 'SYSTEM READY' }}</span>
                    </div>
                    
                    <h1 class="text-5xl md:text-7xl font-heading font-extrabold leading-tight">
                        {{ $profile->full_name ?? 'Developer' }} <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#BFD7FF]">
                            {{ $profile->profession ?? 'Full Stack Dev' }}
                        </span>
                    </h1>

                    <div class="font-mono-tech text-sm text-gray-400 max-w-lg leading-relaxed border-l-2 border-[var(--glow-red)] pl-4">
                        // System Initialization <br>
                        {!! strip_tags($profile->about_text ?? '') !!}
                    </div>

                    <div class="flex items-center space-x-6 pt-4">
                        <a href="#contact" class="font-mono-tech text-sm px-6 py-3 bg-[#DC2626] text-white hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                            EXECUTE : HIRE_ME
                        </a>
                        
                        <div class="flex space-x-4">
                            @if($profile && $profile->github_url)
                            <a href="{{ $profile->github_url }}" class="text-gray-400 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                            @endif
                        </div>
                    </div>
                </div>

                <!-- Image Area -->
                <div class="relative flex justify-center items-center">
                    <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)] to-transparent z-10 rounded-b-full"></div>
                    <!-- Technical crosshair behind image -->
                    <div class="absolute w-full h-full border border-[rgba(191,215,255,0.1)] rounded-full z-0 flex items-center justify-center">
                        <div class="w-full h-[1px] bg-[rgba(191,215,255,0.1)] absolute"></div>
                        <div class="h-full w-[1px] bg-[rgba(191,215,255,0.1)] absolute"></div>
                    </div>
                    
                    @if($profile && $profile->hero_image)
                        <img src="{{ asset('storage/' . $profile->hero_image) }}" alt="Hero Image" class="relative z-0 max-h-[500px] object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                    @else
                        <div class="w-64 h-80 border border-dashed border-[var(--line-blue)] text-[var(--line-blue)] flex items-center justify-center font-mono-tech text-xs opacity-50 z-0">
                            [ NO_IMAGE_DETECTED ]
                        </div>
                    @endif
                </div>
            </div>
        </section>

        <!-- SECTION 02: STATS BAR -->
        @if($profile && $profile->stats_json)
        <section class="border-b border-[rgba(191,215,255,0.1)] bg-[rgba(255,255,255,0.01)] backdrop-blur-sm relative" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-2 left-6 blueprint-label">LEMBAR 02 : METRICS</div>
            
            <div class="max-w-7xl mx-auto px-6 py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[rgba(191,215,255,0.1)] text-center reveal" :class="shown ? 'active' : ''">
                    @foreach($profile->stats_json as $number => $label)
                    <div class="pt-6 md:pt-0 flex flex-col items-center justify-center">
                        <!-- We use a static number for now since Alpine count-up requires parsing strings like '120K+' -->
                        <div class="text-4xl font-heading font-extrabold text-white mb-2 tracking-tight">{{ $number }}</div>
                        <div class="text-xs font-mono-tech text-[var(--line-blue)] uppercase">{{ $label }}</div>
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 03: SERVICES -->
        @if(isset($services) && $services->count() > 0)
        <section id="services" class="py-24 relative border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 03 : ARCHITECTURE_SERVICES</div>
            
            <div class="max-w-7xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="mb-12 border-l-2 border-[var(--glow-blue)] pl-4">
                    <h2 class="text-3xl font-heading font-bold text-white uppercase">Core Competencies</h2>
                    <p class="font-mono-tech text-sm text-gray-500 mt-2">// Available deployment modules</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @foreach($services as $service)
                    <div class="glass-card p-8 group hover:border-[var(--glow-blue)] transition-colors relative overflow-hidden">
                        <!-- Tech pattern corner -->
                        <div class="absolute top-0 right-0 p-2 opacity-30 font-mono-tech text-[10px] text-[var(--line-blue)]">
                            S-{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}
                        </div>
                        
                        <h3 class="text-xl font-heading font-bold mb-4 text-[#BFD7FF]">{{ $service->title }}</h3>
                        <div class="text-gray-400 text-sm leading-relaxed font-sans">
                            {{ $service->description }}
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 04: SKILLS & TOOLS (RULER BAR) -->
        @if(isset($skills) && count($skills) > 0)
        <section id="skills" class="py-24 relative border-b border-[rgba(191,215,255,0.1)] bg-[rgba(10,17,40,0.5)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 04 : TECH_STACK</div>
            
            <div class="max-w-7xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    <!-- Progress Ruler -->
                    <div>
                        <div class="mb-8 border-l-2 border-[var(--brass)] pl-4">
                            <h2 class="text-2xl font-heading font-bold text-white uppercase">Technical Proficiencies</h2>
                        </div>
                        
                        <div class="space-y-8">
                            @foreach($skills as $category => $skillGroup)
                                @if($category != 'Tools & Software')
                                    <div class="font-mono-tech text-xs text-[var(--brass)] mb-4">[{{ strtoupper($category) }}]</div>
                                    @foreach($skillGroup as $skill)
                                    <div class="relative mb-6">
                                        <div class="flex justify-between mb-1 font-mono-tech text-xs">
                                            <span class="text-white">{{ $skill->name }}</span>
                                            <span class="text-[var(--glow-blue)]">{{ $skill->percentage }}%</span>
                                        </div>
                                        <!-- Ruler Style Bar -->
                                        <div class="w-full h-4 border border-[rgba(191,215,255,0.2)] relative">
                                            <!-- Fill -->
                                            <div class="h-full bg-[rgba(59,130,246,0.3)] border-r border-[var(--glow-blue)]" style="width: {{ $skill->percentage }}%"></div>
                                            <!-- Ruler marks (pure CSS) -->
                                            <div class="absolute inset-0 pointer-events-none" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 9.5%, rgba(191,215,255,0.2) 10%);"></div>
                                        </div>
                                    </div>
                                    @endforeach
                                @endif
                            @endforeach
                        </div>
                    </div>
                    
                    <!-- Tools / Badges -->
                    <div>
                        <div class="mb-8 border-l-2 border-[var(--brass)] pl-4">
                            <h2 class="text-2xl font-heading font-bold text-white uppercase">Tools & Environment</h2>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            @foreach($skills as $category => $skillGroup)
                                @if($category == 'Tools & Software')
                                    @foreach($skillGroup as $skill)
                                        <div class="glass-card px-4 py-3 font-mono-tech text-sm text-[var(--line-blue)] flex items-center space-x-2 border-[rgba(191,215,255,0.2)]">
                                            @if($skill->icon_image)
                                                <img src="{{ asset('storage/' . $skill->icon_image) }}" alt="Icon" class="w-4 h-4 object-contain filter grayscale">
                                            @endif
                                            <span>{{ $skill->name }}</span>
                                        </div>
                                    @endforeach
                                @endif
                            @endforeach
                        </div>
                    </div>

                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 05: EXPERIENCE (REVISION LOG) -->
        @if(isset($experiences) && $experiences->count() > 0)
        <section id="experience" class="py-24 relative border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 05 : REVISION_LOG (EXPERIENCE)</div>
            
            <div class="max-w-4xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="mb-12 border-l-2 border-[var(--glow-red)] pl-4">
                    <h2 class="text-3xl font-heading font-bold text-white uppercase">Operational History</h2>
                </div>
                
                <div class="glass-card overflow-hidden">
                    <table class="w-full text-left font-sans text-sm">
                        <thead class="font-mono-tech text-xs bg-[rgba(191,215,255,0.05)] text-[var(--line-blue)] border-b border-[rgba(191,215,255,0.1)]">
                            <tr>
                                <th class="py-4 px-6 uppercase font-normal w-1/4 hidden sm:table-cell">Date</th>
                                <th class="py-4 px-6 uppercase font-normal">Role & Entity</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[rgba(191,215,255,0.1)]">
                            @foreach($experiences as $exp)
                            <tr class="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                                <td class="py-6 px-6 font-mono-tech text-xs text-gray-500 hidden sm:table-cell align-top">
                                    {{ $exp->start_date }} <br> 
                                    ↓ <br> 
                                    {{ $exp->end_date ?? 'PRESENT' }}
                                </td>
                                <td class="py-6 px-6">
                                    <div class="font-mono-tech text-xs text-gray-500 sm:hidden mb-2">
                                        {{ $exp->start_date }} - {{ $exp->end_date ?? 'PRESENT' }}
                                    </div>
                                    <div class="font-heading text-lg font-bold text-white">{{ $exp->role }}</div>
                                    <div class="text-[var(--brass)] font-mono-tech text-xs mt-1 mb-3">{{ $exp->company_name }}</div>
                                    @if($exp->description)
                                    <div class="text-gray-400 text-sm prose prose-invert prose-p:leading-relaxed max-w-none">
                                        {!! $exp->description !!}
                                    </div>
                                    @endif
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 06: PROJECTS GRID -->
        @if(isset($projects) && $projects->count() > 0)
        <section id="projects" class="py-24 relative border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 06 : DEPLOYED_MODULES</div>
            
            <div class="max-w-7xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="mb-12 border-l-2 border-[var(--glow-blue)] pl-4">
                    <h2 class="text-3xl font-heading font-bold text-white uppercase">Featured Projects</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    @foreach($projects as $project)
                    <div class="glass-card group border border-[rgba(191,215,255,0.2)] hover:border-[var(--glow-blue)] transition-colors flex flex-col">
                        <div class="relative aspect-video border-b border-[rgba(191,215,255,0.1)] overflow-hidden">
                            <img src="{{ asset('storage/' . $project->image_path) }}" alt="{{ $project->title }}" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy">
                            <!-- Overlay UI lines -->
                            <div class="absolute inset-0 border-[4px] border-transparent group-hover:border-[rgba(59,130,246,0.3)] transition-all pointer-events-none"></div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-xl font-heading font-bold text-white mb-2">{{ $project->title }}</h3>
                            <div class="text-gray-400 text-sm flex-1 mb-6 prose prose-invert">
                                {!! strip_tags($project->description) !!}
                            </div>
                            
                            <div class="flex flex-wrap gap-2 mb-6">
                                @if(is_array($project->tech_stack))
                                    @foreach($project->tech_stack as $tech)
                                    <span class="px-2 py-1 bg-[rgba(191,215,255,0.05)] border border-[rgba(191,215,255,0.1)] font-mono-tech text-[10px] text-[var(--line-blue)] uppercase">{{ $tech }}</span>
                                    @endforeach
                                @endif
                            </div>
                            
                            <div class="flex space-x-4 border-t border-[rgba(191,215,255,0.1)] pt-4 mt-auto">
                                @if($project->github_url)
                                <a href="{{ $project->github_url }}" target="_blank" class="font-mono-tech text-xs text-white hover:text-[var(--glow-blue)] transition-colors flex items-center">
                                    [ SOURCE ]
                                </a>
                                @endif
                                @if($project->demo_url)
                                <a href="{{ $project->demo_url }}" target="_blank" class="font-mono-tech text-xs text-[var(--glow-red)] hover:text-red-400 transition-colors flex items-center">
                                    [ LIVE_DEMO ]
                                </a>
                                @endif
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 07: VIDEOS (TECH TALKS) -->
        @if(isset($videos) && $videos->count() > 0)
        <section class="py-24 relative border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 07 : BROADCASTS</div>
            
            <div class="max-w-7xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="mb-12 border-l-2 border-[var(--brass)] pl-4">
                    <h2 class="text-3xl font-heading font-bold text-white uppercase">Tech Talks & Demos</h2>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    @foreach($videos as $video)
                    <div class="aspect-[9/16] relative border border-[rgba(191,215,255,0.2)] group overflow-hidden">
                        @if($video->thumbnail_image)
                            <img src="{{ asset('storage/' . $video->thumbnail_image) }}" alt="{{ $video->title }}" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500">
                        @else
                            <div class="w-full h-full bg-[rgba(255,255,255,0.02)] flex items-center justify-center font-mono-tech text-[10px] text-gray-600">NO_SIGNAL</div>
                        @endif
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)] via-transparent to-transparent opacity-90"></div>
                        
                        <div class="absolute bottom-4 left-4 right-4">
                            <div class="text-xs font-mono-tech font-bold text-white leading-snug">{{ $video->title }}</div>
                        </div>
                        
                        @if($video->embed_url)
                        <a href="{{ $video->embed_url }}" target="_blank" class="absolute inset-0 flex items-center justify-center group-hover:bg-[rgba(59,130,246,0.2)] transition-colors">
                            <div class="w-10 h-10 border border-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg class="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </a>
                        @endif
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <!-- SECTION 08: GALLERIES -->
        @if(isset($galleries) && $galleries->count() > 0)
        <section class="py-24 relative border-b border-[rgba(191,215,255,0.1)]" x-data="{ shown: false }" x-intersect.once="shown = true">
            <div class="absolute top-6 left-6 blueprint-label">LEMBAR 08 : VISUAL_RECORDS</div>
            
            <div class="max-w-7xl mx-auto px-6 reveal" :class="shown ? 'active' : ''">
                <div class="mb-12 border-l-2 border-[var(--glow-blue)] pl-4">
                    <h2 class="text-3xl font-heading font-bold text-white uppercase">Event Documentation</h2>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    @foreach($galleries as $photo)
                    <div class="aspect-square relative border border-[rgba(191,215,255,0.1)] overflow-hidden group">
                        <img src="{{ asset('storage/' . $photo->image_path) }}" alt="{{ $photo->caption }}" class="w-full h-full object-cover filter sepia-[.3] group-hover:sepia-0 transition-all duration-500">
                        @if($photo->caption)
                        <div class="absolute inset-0 bg-[rgba(10,17,40,0.8)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                            <p class="font-mono-tech text-xs text-white">{{ $photo->caption }}</p>
                        </div>
                        @endif
                    </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

    </main>

    <!-- FOOTER / CONTACT -->
    <footer id="contact" class="py-24 relative overflow-hidden">
        <div class="absolute top-6 left-6 blueprint-label">LEMBAR 09 : END_OF_FILE</div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            
            <!-- Technical Stamp Decor -->
            <div class="absolute top-0 right-0 md:-right-20 md:-top-10 w-40 h-40 border border-dashed border-[var(--glow-red)] rounded-full stamp-rotate opacity-20 pointer-events-none flex items-center justify-center">
                <div class="w-32 h-32 border border-[var(--glow-red)] rounded-full flex items-center justify-center text-[10px] font-mono-tech text-[var(--glow-red)] text-center">
                    APPROVED <br> FOR <br> DEPLOYMENT
                </div>
            </div>

            <h2 class="text-4xl font-heading font-extrabold mb-4 uppercase">Initiate Protocol: <br> <span class="text-[var(--glow-blue)]">Contact</span></h2>
            <p class="font-mono-tech text-sm text-gray-500 mb-12">Waiting for connection request...</p>
            
            <div class="flex justify-center space-x-6 mb-16">
                @if($profile && $profile->github_url)
                <a href="{{ $profile->github_url }}" target="_blank" class="font-mono-tech text-xs px-6 py-2 border border-[var(--line-blue)] text-[var(--line-blue)] hover:bg-[var(--line-blue)] hover:text-[#0A1128] transition-all">
                    [ GITHUB ]
                </a>
                @endif
                <a href="mailto:{{ \App\Models\User::first()->email ?? 'hello@example.com' }}" class="font-mono-tech text-xs px-6 py-2 bg-white text-[#0A1128] hover:bg-gray-200 transition-all">
                    [ SEND_EMAIL ]
                </a>
            </div>
            
            <div class="font-mono-tech text-[10px] text-gray-600 uppercase border-t border-[rgba(191,215,255,0.1)] pt-8">
                SYS.DATE: {{ date('Y') }} // {{ $profile->full_name ?? 'Portfolio' }} <br>
                ENGINE: LARAVEL 12 // UI: TECH_BLUEPRINT
            </div>
        </div>
    </footer>

</body>
</html>
