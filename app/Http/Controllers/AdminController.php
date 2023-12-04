<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Voter;
use App\Models\Candidate;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(){
        $candidates = Candidate::orderBy('votes', 'desc')->take(3)->get();
        $voters = Voter::where('nis', '!=', '00001' )->paginate(3);
        
        return Inertia::render('Admin/AdminDashboard/Admin', [
            'candidates' => $candidates,
            'voters' => $voters
        ]);
    }

    public function voters() {
        $voters = Voter::where('nis', '!=', '00001')->paginate(8);
        // dd($voters);
        return Inertia::render('Admin/Voters/Voters', [
            'voters' => $voters
        ]);
    }

    public function candidates() {
        $candidates = Candidate::orderBy('votes', 'desc')->take(8)->get();
        return Inertia::render('Admin/Candidates/Candidates', [
            'candidates' => $candidates
        ]);
    }
}
