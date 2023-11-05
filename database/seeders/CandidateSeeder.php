<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('candidates')->insert([
            'nis' => '20189',
            'name' => 'Joko Susilo'
        ]);
    }
}
