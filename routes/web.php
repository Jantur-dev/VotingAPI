<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\ProfileController;

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
    return Inertia::render('App');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/hasil', [ResultController::class, 'getResult']);
Route::get('/detail/{id}', [ResultController::class, 'detailCandidate']);
Route::get('/vote', [VoterController::class, 'pageVote']);
Route::post('/vote', [VoterController::class, 'vote']);

// Route::get('/admin', function() {
//     return Inertia::render('Admin/Admin');
// });

Route::get('/admin', [AdminController::class, 'dashboard']);
Route::get('/admin/voters', [AdminController::class, 'voters']);
Route::get('/admin/candidates', [AdminController::class, 'candidates']);

require __DIR__.'/auth.php';
