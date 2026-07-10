<?php

namespace App\Filament\Resources\Services\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class ServicesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('icon')->label('Ikon'),
                TextColumn::make('title')->label('Layanan')->searchable(),
                TextColumn::make('order_column')->label('Urutan')->sortable(),
            ])
            ->defaultSort('order_column')
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
