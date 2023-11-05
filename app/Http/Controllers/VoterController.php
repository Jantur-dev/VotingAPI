<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Voter;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\NotifikasiEmail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request) {
        $data_voter = Voter::where('nis', $request->nis)->first();
        if(isset($data_voter)) {
            $expiredAt = now()->setTimezone('Asia/Jakarta')->addMinutes(5);
            $voter = Voter::where('nis', $request->nis)->updateOrCreate(
            [],
            [    
                'email' => $request->email,
                'otp' => strval(random_int(1000, 9999)),
                'otp_expired_at' => $expiredAt
            ]);
            
            // $data = array('name' => $voter->name, 'otp' => $voter->otp, 'nis' => $voter->nis);
            // Mail::send('mail', $data, function ($message) use ($voter) {
            //     $message->to($voter->email)->subject('Verify Email from JanturVote');
            //     $message->from('vote@gmail.com', 'jantur');
            // });

            return response()->json([
                'status' => true,
                'msg' => 'berhasil login. Cek email untuk verifikasi',
                'data' => [
                    $voter
                ]
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'Gagal login. Coba ulangi nanti'
        ]);
    }

    public function verify(Request $request) {
        $voter = Voter::where('otp', $request->otp)->first();
        if(isset($voter)) {
            if($voter->otp === $request->otp && $voter->otp_expired_at >= now()->timezone('Asia/Jakarta')) {
                $voter->email_verified_at = now()->timezone('Asia/Jakarta');
                $voter->update();
                
                return response()->json([
                    'status' => true,
                    'msg' => 'OTP valid. Voter berhasil diverifikasi.'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'msg' => 'OTP tidak valid atau sudah kadaluwarsa'
                ]);
            }
        }
        return response()->json([
            'status' => false,
            'msg' => 'OTP tidak tersedia.'
        ]);
    }

    public function resendOtp() {
        // menampilkan jumlah resend ulang otp, jika lebih dari 2x resend maka tidak dapat resend lagi
    }
}
