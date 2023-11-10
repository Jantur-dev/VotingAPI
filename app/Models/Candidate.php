<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $table = 'candidates';
    protected $primaryKey = 'nis'; 
    protected $guarded = [''];

    public function voter() {
        return $this->hasMany(Voter::class, 'candidateNis', 'nis');
    }
}
