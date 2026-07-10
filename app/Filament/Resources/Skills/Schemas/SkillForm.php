<?php

namespace App\Filament\Resources\Skills\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class SkillForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Data Keahlian')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Keahlian')
                            ->required()
                            ->maxLength(255),
                        Select::make('category')
                            ->label('Kategori')
                            ->required()
                            ->options([
                                'Web Development' => 'Web Development',
                                'Database' => 'Database',
                                'Administrasi' => 'Administrasi',
                                'Tools & Software' => 'Tools & Software',
                            ]),
                        TextInput::make('percentage')
                            ->label('Persentase Keahlian')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100)
                            ->suffix('%'),
                        FileUpload::make('icon_image')->disk('s3')
                            ->label('Logo/Ikon Tool (Opsional)')
                            ->image()
                            ->directory('skills'),
                    ])->columns(2),
            ]);
    }
}
