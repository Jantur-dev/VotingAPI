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
        $voters = Voter::where('nis', '!=', '00001')->paginate(5);
        // dd($voters);
        return Inertia::render('Admin/Voters/Voters', [
            'voters' => $voters
        ]);
    }

    public function candidates() {
        // $candidates = Candidate::orderBy('votes', 'desc')->take(3)->get();
        $candidates = Candidate::orderBy('votes', 'desc')->paginate(5);
        return Inertia::render('Admin/Candidates/Candidates', [
            'candidates' => $candidates
        ]);
    }

    public function tambah() {
        return Inertia::render('Admin/Tambah/MainTambah');
    }

    public function createVoter(Request $request) {
        if ($request->isMethod('post')) {
            Voter::create([
                'nis' => $request->nis,
                'name' => $request->name
            ]);
        }
    }
    
    public function createCandidate(Request $request) {
        if ($request->isMethod('post')) {
            Candidate::create([
                'nis' => $request->nis,
                'name' => $request->name
            ]);
        }
    }

    public function viewChart() {
        $dataX = Candidate::pluck('name')->all();
        /* 
            0 => "Andi Jokoni"
            1 => "Joy Budi"
            2 => "Joko Susilo"
            3 => "Budiono"
            4 => "Jokono"
            5 => "Susilo Budini"
        */
        $dataY = Candidate::pluck('votes')->all();
        /* 
            0 => 100 -> punya Andi Jokoni
            1 => 120 => Joy Budi
            2 => 200 => <urut...>
            3 => 250
            4 => null
            5 => null
        */
        return Inertia::render('Admin/Chart/MainChart', [
            'dataX' => $dataX,
            'dataY' => $dataY
        ]);
    }
    
}
