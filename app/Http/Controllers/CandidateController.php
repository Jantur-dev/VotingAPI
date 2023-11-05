<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $candidates = Candidate::get();
        // dd($candidate->isEmpty());
        if($candidates->isEmpty()) {
            return response()->json([
                'status' => false,
                'msg' => 'gagal menampilkan semua kandidat. Data kosong',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => true,
            'msg' => 'berhasil menampilkan semua data kandidat',
            'data' => $candidates
        ]);
    }
}
