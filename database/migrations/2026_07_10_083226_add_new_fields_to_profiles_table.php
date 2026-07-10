<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('hero_badge')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('about_image')->nullable();
            $table->string('signature_image')->nullable();
            $table->string('years_of_experience')->nullable();
            $table->string('projects_completed')->nullable();
            $table->json('stats_json')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['hero_badge', 'hero_image', 'about_image', 'signature_image', 'years_of_experience', 'projects_completed', 'stats_json']);
        });
    }
};
