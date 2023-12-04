<?php

use App\Models\Voter;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::middleware('guest')->group(function () {
    // Route::get('register', [VoterController::class, 'create'])
    //             ->name('register');

    Route::post('register', [VoterController::class, 'register']);
    Route::get('register', [VoterController::class, 'PageLogin'])
    ->name('register');
    
    Route::get('login', [VoterController::class, 'PageLogin'])
                ->name('login');

    Route::post('login', [VoterController::class, 'login'])->name('login');

    Route::get('resend-otp', [VoterController::class, 'PageReSendOtp'])
                ->name('resend.otp');

    Route::post('resend-otp', [VoterController::class, 'resendOtp'])
                ->name('resend.otp');

    // Route::get('verify', [NewPasswordController::class, 'create'])
    //             ->name('verify');

    Route::post('verify', [VoterController::class, 'verify'])
                ->name('verify');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});
