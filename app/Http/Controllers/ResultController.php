<?php

namespace App\Http\Controllers; 

use Inertia\Inertia;
use App\Models\Voter;
use Inertia\Response;
use App\Models\Candidate;
use Illuminate\Http\Request; 
class ResultController extends Controller 
{ 
    public function detailCandidate($id) {
        // $candidate = Candidate::where($id)->first();
        
        return Inertia::render('Profile/Detail', [
            'id' => $id
        ]);
    }
    
    public function getResult(Request $request){  
        $candidates = Candidate::all(); 
        // return response()->json([ 
        //     "hasil" => $candidates
        // ])
        return Inertia::render("Hasil", [
            'hasil' => $candidates
        ]);
    } 
    public function create(): Response {
        return Inertia::render("Auth/Login");
    }

    public function store(Request $request): Response {
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
                // 
                // return response()->json([
                //     'status' => true,
                //     'msg' => 'Berhasil. Silahkan cek email untuk verifikasi',
                //     'data' => [
                //         $voter
                //     ]
                // ]);
                return Inertia::render("Auth/Login", [
                    "status" => true,
                    "msg" => "Berhasil silahkan cek email",
                    "value" => $voter->otp
                ]);
            }

            // return response()->json([
            //     'status' => false,
            //     'msg' => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote',
            //     'data' => [
            //         'otp_terakhir' => $data_voter->otp
            //     ]
            // ]);
            return Inertia::render("Auth/Login", [
                "status"=> false,
                "msg" => 'Sudah melebihi request otp, gunakan otp terakhir, tetap gagal?. Mintalah kertas dari panitia untuk vote',
                "value" => $data_voter->otp
            ]);
        }

        // return response()->json([
        //     'status' => false,
        //     'msg' => 'Gagal. Coba ulangi nanti'
        // ]);
        return Inertia::render("Auth/Login", [
            "status"=> false,
            "msg" => "Failed. Coba lagi nanti"
        ]);
    }
}
