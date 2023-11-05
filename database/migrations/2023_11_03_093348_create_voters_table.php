<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voters', function (Blueprint $table) {
            $table->string('nis')->unique()->primary();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('otp')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('voted_at')->nullable();
            $table->enum('status', ['SUDAH','BELUM'])->default('BELUM');
            $table->string('candidate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voters');
    }
};
