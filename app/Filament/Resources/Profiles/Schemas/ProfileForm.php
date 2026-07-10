<?php

namespace App\Filament\Resources\Profiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Schema;

class ProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Utama')
                    ->schema([
                        TextInput::make('full_name')->label('Nama Lengkap')->required(),
                        TextInput::make('profession')->label('Profesi')->required(),
                        TextInput::make('hero_badge')->label('Hero Badge (e.g. Content Creator)'),
                        RichEditor::make('about_text')->label('Tentang Saya')->columnSpanFull(),
                    ])->columns(2),
                Section::make('Media & Gambar')
                    ->schema([
                        FileUpload::make('hero_image')->label('Foto Utama (Hero)')->image()->directory('profiles'),
                        FileUpload::make('about_image')->label('Foto About Me')->image()->directory('profiles'),
                        FileUpload::make('signature_image')->label('Tanda Tangan')->image()->directory('profiles'),
                    ])->columns(3),
                Section::make('Statistik & Angka')
                    ->schema([
                        TextInput::make('years_of_experience')->label('Tahun Pengalaman (e.g. 6+)'),
                        TextInput::make('projects_completed')->label('Proyek Selesai / Kolaborasi (e.g. 70+)'),
                        KeyValue::make('stats_json')->label('Statistik Tambahan')->keyLabel('Angka (misal: 7500+)')->valueLabel('Label (misal: Followers)')->columnSpanFull(),
                    ])->columns(2),
                Section::make('Media Sosial & CV')
                    ->schema([
                        FileUpload::make('cv_pdf_path')->label('File CV (PDF)')->acceptedFileTypes(['application/pdf'])->directory('cv'),
                        TextInput::make('github_url')->url(),
                        TextInput::make('instagram_url')->url(),
                        TextInput::make('youtube_url')->url(),
                    ])->columns(2),
            ]);
    }
}
