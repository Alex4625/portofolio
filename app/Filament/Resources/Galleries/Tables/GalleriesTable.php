<?php

namespace App\Filament\Resources\Galleries\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class GalleriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')->label('Foto'),
                TextColumn::make('caption')->label('Caption')->searchable(),
                TextColumn::make('order_column')->label('Urutan')->sortable(),
            ])
            ->defaultSort('order_column')
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
