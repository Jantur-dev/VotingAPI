<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\VoterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/index', [CandidateController::class, 'index']);
Route::post('/register', [VoterController::class, 'register']);
Route::post('/login',[VoterController::class, 'login']);
Route::post('/logout',[VoterController::class, 'logout'])->middleware(['verifyEmail', 'login']);
Route::post('/resend-otp', [VoterController::class, 'resendOtp']);
Route::post('/otp/verify/{nis}',[VoterController::class, 'verify'])->middleware('hasOtp');
Route::post('/vote', [VoterController::class, 'vote'])->middleware(['verifyEmail', 'login']);

// admin
Route::get('/admin/index', [AdminController::class, 'index'])->middleware('admin');
Route::get('/admin/candidates', [AdminController::class, 'dataCandidate'])->middleware('admin');