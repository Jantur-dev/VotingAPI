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
        DB::table('voters')->insert([
            ['nis' => '20199', 
            'name' => 'Ikhsandi'],
            ['nis' => '20213',
            'name' => 'Rubben'],
            ['nis' => '20200',
            'name' => 'Andi'],
            ['nis' => '20100',
            'name' => 'Budi'],
            ['nis' => '20109',
            'name' => 'Tono'],
            ['nis' => '20214',
            'name' => 'Onot'],
            ['nis' => '20132',
            'name' => 'Onad'],
            ['nis' => '20190',
            'name' => 'Fuji'],
            ['nis' => '20211',
            'name' => 'Roro'],
            ['nis' => '20113',
            'name' => 'Roko'],
            
        ]);
    }
}
