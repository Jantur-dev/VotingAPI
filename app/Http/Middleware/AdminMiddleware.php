<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Voter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Voter::where('role', 'admin')->where('active_status', '1')->whereNotNull('email_verified_at')->first();
        if(!isset($user)) {
            return response()->json([
                'status' => false,
                'msg' => 'Hanya admin yang punya akses.'
            ], 403);
        }
        return $next($request);
    }
}
