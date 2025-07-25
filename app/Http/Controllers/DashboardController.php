<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Pesan;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        if (Auth::user()->role == 'admin') {
            $totalNotes = Note::count();
            $totalProjects = Project::count();
            $totalMessages = Pesan::count();
            $totalUsers = User::count();

            $latestNotes = Note::with('user')
                ->where('user_id', Auth::id())
                ->latest()->take(3)->get();
            $latestProjects = Project::latest('updated_at')->take(3)->get();

            return Inertia::render('Dashboard/Dashboard', [
                'totalNotes' => $totalNotes,
                'totalProjects' => $totalProjects,
                'totalMessages' => $totalMessages,
                'totalUsers' => $totalUsers,
                'latestNotes' => $latestNotes,
                'latestProjects' => $latestProjects,
            ]);
        } elseif (Auth::user()->role == 'writer') {
            return Inertia::render('Dashboard/Dashboard', []);
        } else {
            return Inertia::render('Dashboard/Dashboard', []);
        }
    }
}
