<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Menambahkan header keamanan dasar
        $response->headers->set('X-Frame-Options', 'DENY'); // Cegah iframe (clickjacking)
        $response->headers->set('X-Content-Type-Options', 'nosniff'); // Cegah MIME sniffing
        $response->headers->set('X-XSS-Protection', '1; mode=block'); // Perlindungan XSS bawaan browser tua
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Privasi referrer
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); // HSTS (1 tahun)

        // Hapus header tanda tangan server PHP yang berpotensi membocorkan versi
        if (function_exists('header_remove')) {
            header_remove('X-Powered-By');
        }

        // Kebijakan Konten (Content-Security-Policy) dasar 
        // Mengizinkan skrip dan gaya dari sumber sendiri dan CDN tertentu jika diperlukan
        // $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https://pub-bb3ad634e09444a1b3bcbe6d9cdef19e.r2.dev https://res.cloudinary.com; frame-src 'self' https://www.youtube.com https://www.tiktok.com;");

        return $response;
    }
}
