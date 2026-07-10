<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Foto Galeri')
                    ->schema([
                        FileUpload::make('image_path')->disk('s3')->label('Foto Dokumentasi')->image()->directory('galleries')->required()->columnSpanFull(),
                        TextInput::make('caption')->label('Keterangan / Caption')->columnSpanFull(),
                        TextInput::make('order_column')->label('Urutan')->numeric()->default(0),
                    ])->columns(2),
            ]);
    }
}
