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
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use function PHPSTORM_META\map;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create(): Response {
        return Inertia::render("Auth/Register");
    }
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|string|max:5|min:5',
            'email' => 'required|string|email|'
        ]);

        if($validator->fails()) {
            return Inertia::render("Auth/Register", [
                'errors' => $validator->errors()
            ]);
        }
        // if($validator->fails()) {
        //     return response()->json([
        //         'status' => false,
        //         'msg' => $validator->errors()
        //     ], 422);
        // }
        
        $data_voter = Voter::where('nis', $request->nis)->first();
        if(isset($data_voter)) {
            if($data_voter->amount_otp != 0) {
                $expiredAt = now()->setTimezone('Asia/Jakarta')->addMinutes(5);
                $voter = Voter::where('nis', $request->nis)->updateOrCreate(
                [],
                [    
                    'email' => $request->email,
                    'otp' => strval(random_int(1000, 9999)),
                    'otp_expired_at' => $expiredAt,
                    'amount_otp' => $data_voter->amount_otp-1
                ]);
                
                // $data = array('name' => $voter->name, 'otp' => $voter->otp, 'nis' => $voter->nis);
                // Mail::send('mail', $data, function ($message) use ($voter) {
                //     $message->to($voter->email)->subject('Verify Email from JanturVote');
                //     $message->from('vote@gmail.com', 'jantur');
                // });
    
                return response()->json([
                    'status' => true,
                    'msg' => 'Berhasil. Silahkan cek email untuk verifikasi',
                    'data' => [
                        $voter
                    ]
                ]);
            }
            return response()->json([
                'status' => false,
                'msg' => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote',
                'data' => [
                    'otp_terakhir' => $data_voter->otp
                ]
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'Gagal. Coba ulangi nanti'
        ]);
    }

    public function verify(Request $request) {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|max:4|min:4'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ]);
        }

        $voter = Voter::where('otp', $request->otp)->first();
        if(isset($voter)) {
            if($voter->otp === $request->otp && $voter->otp_expired_at >= now()->timezone('Asia/Jakarta')) {
                $voter->email_verified_at = now()->timezone('Asia/Jakarta');
                $voter->amount_otp = 3;
                $voter->active_status = '1';
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

    public function resendOtp(Request $request) {
        $validator = Validator::make($request->all(), [
            'nis' => 'string|max:5|min:5|string'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $data_voter = Voter::where('nis', $request->nis)->whereNotNull('email')->first();
        if(isset($data_voter)) {
            if($data_voter->amount_otp != 0) {
                $expiredAt = now()->setTimezone('Asia/Jakarta')->addMinutes(5);
                $voter = Voter::where('nis', $request->nis)->updateOrCreate(
                [],
                [    
                    'otp' => strval(random_int(1000, 9999)),
                    'otp_expired_at' => $expiredAt,
                    'amount_otp' => $data_voter->amount_otp-1
                ]);
                
                // $data = array('name' => $voter->name, 'otp' => $voter->otp, 'nis' => $voter->nis);
                // Mail::send('mail', $data, function ($message) use ($voter) {
                //     $message->to($voter->email)->subject('Verify Email from JanturVote');
                //     $message->from('vote@gmail.com', 'jantur');
                // });
    
                return response()->json([
                    'status' => true,
                    'msg' => 'Berhasil. Silahkan cek email untuk verifikasi',
                    'data' => [
                        $voter
                    ]
                ]);
            }
            return response()->json([
                'status' => false,
                'msg' => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote',
                'data' => [
                    'otp_terakhir' => $data_voter->otp
                ]
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'Gagal kirim ulang. Coba lagi'
        ]);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|min:5|max:5|string',
            'email' => 'required|email|string'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ]);
        }

        $voter = Voter::where('nis', $request->nis)->where('email', $request->email)->whereNotNull('email_verified_at')->first();
        if(isset($voter)) {
            $voter->active_status = '1';
            $voter->update();
            return response()->json([
                'status' => true,
                'msg' => 'Berhasil login'
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'gagal login, coba lagi'
        ]);
    }

    public function logout(Request $request){
        $voter_otp = Voter::where('otp', $request->otp)->first();
        $voter = Voter::where('nis', $voter_otp->nis)->where('email', $voter_otp->email)->whereNotNull('email_verified_at')->first();
        if(isset($voter) && ($voter->active_status == '1')) {
            $voter->active_status = '0';
            $voter->update();
            return response()->json([
                'status' => true,
                'msg' => 'Berhasil logout'
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'gagal logout, coba lagi'
        ]);
    }
}
