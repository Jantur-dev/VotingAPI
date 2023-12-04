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
            ['nis' => '20189',
            'name' => 'Joko Susilo'],
            ['nis' => '20089',
            'name' => 'Andi Jokoni'],
            ['nis' => '20981',
            'name' => 'Susilo Budini'],
            ['nis' => '20129',
            'name' => 'Joy Budi'],
            ['nis' => '20191',
            'name' => 'Budiono'],
            ['nis' => '20289',
            'name' => 'Jokono'],
        ]);
    }
}
