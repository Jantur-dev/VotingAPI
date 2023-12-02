<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voter extends Model
{
    use HasFactory;

    protected $table = 'voters';
    protected $primaryKey = 'nis';
    protected $guarded = [''];
}
