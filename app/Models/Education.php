<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Education extends Model
{
    use HasUuids;

    protected $table = 'educations';

    protected $guarded = [];
}
