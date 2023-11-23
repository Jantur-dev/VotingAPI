<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Voter;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index() {
        $voters = Voter::where('role', 'voter')->get();
        return response()->json([
            'status' => true,
            'msg' => 'Berhasil get all data voter',
            'data' => $voters
        ]);
    }

    public function dataCandidate() {
        $candidates = Candidate::all();
        return response()->json([
            'status' => true,
            'msg' => 'Berhasil get all data candidate',
            'data' => $candidates
        ]);
    }
}
