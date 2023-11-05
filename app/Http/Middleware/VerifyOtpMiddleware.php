<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Voter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyOtpMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $kode_otp = $request->header('otp');
        if(isset($kode_otp)) {
            $voter = Voter::where('otp', $kode_otp)->whereNotNull('email_verified_at')->first();
            if(isset($voter)) {
                return $next($request);
            } else {
                return response()->json([
                    'status' => false,
                    'msg' => 'harap login atau verifikasi email lebih dulu.'
                ]);
            }
        }
    }
}
