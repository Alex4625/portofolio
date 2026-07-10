<?php

namespace App\Filament\Resources\Skills\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class SkillsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('icon_image')->label('Ikon')->size(40),
                TextColumn::make('name')->label('Keahlian')->searchable(),
                TextColumn::make('category')->label('Kategori')->badge()->sortable(),
                TextColumn::make('percentage')->label('Persentase')->suffix('%')->sortable(),
            ])
            ->defaultSort('category')
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
