<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Voter;
use Inertia\Response;
use App\Models\Candidate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\NotifikasiEmail;
use function PHPSTORM_META\map;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create(): Response
    {
        return Inertia::render("Auth/Register");
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|string|max:5|min:5',
            'email' => 'required|string|email|'
        ]);

        // if($validator->fails()) {
        //     return Inertia::render("Auth/Register", [
        //         'errors' => $validator->errors()
        //     ]);
        // }
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $data_voter = Voter::where('nis', $request->nis)->first();
        if (isset($data_voter)) {
            if ($data_voter->amount_otp != 0) {
                $expiredAt = now()->setTimezone('Asia/Jakarta')->addMinutes(5);
                $voter = Voter::where('nis', $request->nis)->updateOrCreate(
                    [],
                    [
                        'email' => $request->email,
                        'otp' => strval(random_int(1000, 9999)),
                        'otp_expired_at' => $expiredAt,
                        'amount_otp' => $data_voter->amount_otp - 1
                    ]
                );

                $data = array('name' => $voter->name, 'otp' => $voter->otp, 'nis' => $voter->nis);
                Mail::send('mail', $data, function ($message) use ($voter) {
                    $message->to($voter->email)->subject('Verify Email from JanturVote');
                    $message->from('vote@gmail.com', 'Jantur-Dev');
                });

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
                'msg' => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote'
            ], 429);
        }

        return response()->json([
            'status' => false,
            'msg' => 'NIS tidak ditemuakn, gagal. Coba ulangi'
        ], 400);
    }

    public function verify(Request $request, $nis)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|max:4|min:4'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $voter = Voter::where('nis', $nis)->first();
        if (isset($voter)) {
            if ($voter->otp === $request->otp) {
                if ($voter->otp === $request->otp && $voter->otp_expired_at >= now()->timezone('Asia/Jakarta')) {
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
                    ], 406);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'msg' => 'OTP tidak valid.'
                ], 400);
            }
        }
        return response()->json([
            'status' => false,
            'msg' => 'NIS tidak tersedia.'
        ], 400);
    }

    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'string|max:5|min:5|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $data_voter = Voter::where('nis', $request->nis)->whereNotNull('email')->first();
        if (isset($data_voter)) {
            if ($data_voter->amount_otp != 0) {
                $expiredAt = now()->setTimezone('Asia/Jakarta')->addMinutes(5);
                $voter = Voter::where('nis', $request->nis)->updateOrCreate(
                    [],
                    [
                        'otp' => strval(random_int(1000, 9999)),
                        'otp_expired_at' => $expiredAt,
                        'amount_otp' => $data_voter->amount_otp - 1
                    ]
                );

                $data = array('name' => $voter->name, 'otp' => $voter->otp, 'nis' => $voter->nis);
                Mail::send('mail', $data, function ($message) use ($voter) {
                    $message->to($voter->email)->subject('Verify Email from JanturVote');
                    $message->from('vote@gmail.com', 'Jantur-Dev');
                });

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
                'msg' => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote'
            ], 400);
        }

        return response()->json([
            'status' => false,
            'msg' => 'Gagal kirim ulang. Coba lagi'
        ], 406);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|min:5|max:5',
            'email' => 'required|email|string',
            'otp' => 'required|min:4|max:4|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $voter = Voter::where('otp', $request->otp)->where('email', $request->email)->where('nis', $request->nis)->whereNotNull('email_verified_at')->first();
        if (isset($voter)) {
            $voter->active_status = '1';
            $voter->update();
            return response()->json([
                'status' => true,
                'msg' => 'Berhasil login',
                'data' => $voter
            ]);
        }

        return response()->json([
            'status' => false,
            'msg' => 'gagal login, coba lagi'
        ], 400);
    }

    public function logout(Request $request)
    {
        $voter_otp = Voter::where('otp', $request->otp)->first();
        $voter = Voter::where('nis', $voter_otp->nis)->where('email', $voter_otp->email)->whereNotNull('email_verified_at')->first();
        if (isset($voter) && ($voter->active_status == '1')) {
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
        ], 400);
    }

    public function vote(Request $request)
    {
        $candidate = Candidate::where('nis', $request->candidate_nis)->first();
        $voter = Voter::where('nis', $request->voter_nis)->first();
        if ($voter->vote_status != 'SUDAH') {
            if (isset($candidate)) {
                $voter->candidateNis = $candidate->nis;
                $voter->candidate = $candidate->name;
                $voter->vote_status = 'SUDAH';
                $voter->update();

                if ($candidate->nis == $request->candidate_nis) {
                    $candidate->votes += 1;
                    $candidate->update();
                }

                return response()->json([
                    'status' => true,
                    'msg' => 'Berhasil vote'
                ]);
            }

            return response()->json([
                'status' => false,
                'msg' => 'Gagal vote. Coba lagi'
            ], 400);
        }
        return response()->json([
            'status' => false,
            'msg' => 'Gagal vote. Kamu sudah vote, tidak bisa vote 2x'
        ], 406);
    }

    public function cekVote(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'string|min:5|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()
            ], 422);
        }

        $voter = Voter::where('nis', $request->nis)->first();
        if (isset($voter)) {
            if ($voter->vote_status == 'SUDAH') {
                return response()->json([
                    'status' => true,
                    'msg' => 'Voter sudah vote'
                ]);
            } else if ($voter->vote_status == 'BELUM') {
                return response()->json([
                    'status' => false,
                    'msg' => 'Voter belum vote'
                ], 406);
            }
        }
        return response()->json([
            'status' => false,
            'msg' => 'Voter tidak ditemukan'
        ], 404);
    }
}
