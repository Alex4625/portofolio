<?php

namespace App\Filament\Resources\Education\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class EducationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Pendidikan')
                    ->schema([
                        TextInput::make('institution')
                            ->label('Institusi')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Contoh: INSTIKI'),
                        TextInput::make('degree')
                            ->label('Gelar / Jenjang')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Contoh: S1 Manajemen Data'),
                        TextInput::make('start_year')
                            ->label('Tahun Mulai')
                            ->required()
                            ->numeric()
                            ->minValue(1990)
                            ->maxValue(2030),
                        TextInput::make('end_year')
                            ->label('Tahun Selesai')
                            ->numeric()
                            ->minValue(1990)
                            ->maxValue(2030)
                            ->placeholder('Kosongkan jika masih berlangsung'),
                        TextInput::make('order_column')
                            ->label('Urutan Tampil')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
            ]);
    }
}
