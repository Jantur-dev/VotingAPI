<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Voter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasOtp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $headerNis = $request->header('nis');        
        if(isset($headerNis)) {
            $voter = Voter::where('nis', $headerNis)->first();
            if(isset($voter)) {
                return $next($request);
            } else if(empty($voter->otp)) {
                return response()->json([
                    'status' => false,
                    'msg' => 'NIS tidak ditemukan.'
                ], 400);
            }
        } else {
            return response()->json([
                'status' => false,
                'msg' => 'Not Found'
            ], 404);
        }
    }
}
