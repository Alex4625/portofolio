<?php

namespace App\Filament\Resources\Education\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EducationTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('institution')
                    ->label('Institusi')
                    ->searchable(),
                TextColumn::make('degree')
                    ->label('Gelar'),
                TextColumn::make('start_year')
                    ->label('Mulai')
                    ->sortable(),
                TextColumn::make('end_year')
                    ->label('Selesai')
                    ->default('Sekarang')
                    ->sortable(),
                TextColumn::make('order_column')
                    ->label('Urutan')
                    ->sortable(),
            ])
            ->defaultSort('order_column')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
