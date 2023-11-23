<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'nis' => '00001',
            'name' => 'Admin',
            'email' => 'adminVote@mail.com',
            'otp' => '0001',
            'role' => 'admin',
            'otp_expired_at' => Carbon::now(),
            'email_verified_at' => Carbon::now()
        ]);
    }
}
