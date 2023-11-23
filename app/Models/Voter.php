<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'nis';
    protected $guarded = [''];

    public function candidate() {
        return $this->belongsTo(Candidate::class, 'candidateNis', 'nis');
    }
}
