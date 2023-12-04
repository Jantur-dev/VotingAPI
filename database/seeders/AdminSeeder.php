<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('voters')->insert([
            [
                'nis' => '00001',
                'name' => 'Admin',
                'email' => 'admin123@mail.com',
                'otp' => '0001',
                'email_verified_at' => Carbon::now()
            ]
            
        ]);
    }
}
