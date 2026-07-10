<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detail Layanan')
                    ->schema([
                        TextInput::make('title')->label('Nama Layanan')->required(),
                        TextInput::make('order_column')->label('Urutan')->numeric()->default(0),
                        FileUpload::make('icon')->disk('s3')->label('Ikon (Image)')->image()->directory('services')->columnSpanFull(),
                        Textarea::make('description')->label('Deskripsi Layanan')->columnSpanFull(),
                    ])->columns(2),
            ]);
    }
}
