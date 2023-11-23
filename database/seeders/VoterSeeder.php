<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VoterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'nis' => '20199',
                'name' => 'Ikhsandi'
            ],
            [
                'nis' => '20188',
                'name' => 'Joko'
            ],
        ]);
    }
}
