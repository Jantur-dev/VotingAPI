<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Voter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $kode_otp = $request->header('otp');
        if(isset($kode_otp)) {
            $voter = Voter::where('otp', $kode_otp)->whereNotNull('email_verified_at')->first();
            if($voter->active_status == '1') {
                return $next($request);
            } else {
                return response()->json([
                    'status' => false,
                    'msg' => 'silahkan login'
                ]);
            }
        }
    }
}
