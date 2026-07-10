<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Proyek')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Proyek')
                            ->required()
                            ->maxLength(255),
                        RichEditor::make('description')
                            ->label('Deskripsi')
                            ->required()
                            ->columnSpanFull(),
                        FileUpload::make('image_path')->disk('s3')
                            ->label('Thumbnail Proyek')
                            ->image()
                            ->directory('projects')
                            ->maxSize(2048)
                            ->columnSpanFull(),
                    ])->columns(2),
                Section::make('Teknologi & Tautan')
                    ->schema([
                        TagsInput::make('tech_stack')
                            ->label('Tech Stack')
                            ->placeholder('Tambah teknologi...')
                            ->columnSpanFull(),
                        TextInput::make('demo_url')
                            ->label('Demo URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('github_url')
                            ->label('GitHub URL')
                            ->url()
                            ->maxLength(255),
                        Toggle::make('is_featured')
                            ->label('Tampilkan di Halaman Utama')
                            ->default(true),
                    ])->columns(2),
            ]);
    }
}
