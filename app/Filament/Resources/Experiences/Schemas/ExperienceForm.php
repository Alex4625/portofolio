<?php

namespace App\Filament\Resources\Experiences\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class ExperienceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Pengalaman')
                    ->schema([
                        TextInput::make('company_name')->label('Nama Perusahaan/Organisasi')->required(),
                        TextInput::make('role')->label('Jabatan/Peran')->required(),
                        TextInput::make('start_date')->label('Tahun / Tanggal Mulai')->required(),
                        TextInput::make('end_date')->label('Tahun / Tanggal Selesai')->placeholder('Kosongkan jika masih berlangsung'),
                        RichEditor::make('description')->label('Deskripsi Pekerjaan')->columnSpanFull(),
                        TextInput::make('order_column')->label('Urutan')->numeric()->default(0),
                    ])->columns(2),
            ]);
    }
}
