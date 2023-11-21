<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RealtimeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/chat', function(){
    return view('chat');
})->name('chat');

Route::get('/chat2', function(){
    return view('chat2');
})->name('chat2');

Route::post('/chat',[RealtimeController::class, 'send_message'])->name('send.realtime.chat');
Route::post('/chat2',[RealtimeController::class, 'send_message'])->name('send.realtime.chat2');

Route::get('/otp/verify/{nis}', function($nis) {
    return Inertia::render('Auth/VerifyEmail', ['nis' => $nis]);
});

require __DIR__.'/auth.php';
