<?php

namespace App\Filament\Resources\Experiences\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class ExperiencesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('company_name')->label('Perusahaan')->searchable(),
                TextColumn::make('role')->label('Jabatan'),
                TextColumn::make('start_date')->label('Mulai'),
                TextColumn::make('end_date')->label('Selesai'),
                TextColumn::make('order_column')->label('Urutan')->sortable(),
            ])
            ->defaultSort('order_column')
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
