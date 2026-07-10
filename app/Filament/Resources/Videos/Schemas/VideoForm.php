<?php

namespace App\Filament\Resources\Videos\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Konten Video')
                    ->schema([
                        TextInput::make('title')->label('Judul Konten')->required(),
                        TextInput::make('order_column')->label('Urutan')->numeric()->default(0),
                        TextInput::make('embed_url')->label('Embed URL (TikTok/YouTube)')->url()->columnSpanFull(),
                        FileUpload::make('thumbnail_image')->label('Gambar Thumbnail (Opsional)')->image()->directory('videos')->columnSpanFull(),
                    ])->columns(2),
            ]);
    }
}
