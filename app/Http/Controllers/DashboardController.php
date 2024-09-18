<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if (Auth::user()->role == 'admin') {
            return Inertia::render('Dashboard/Dashboard', []);
        } elseif (Auth::user()->role == 'writer') {
            return Inertia::render('Dashboard/Dashboard', []);
        } else {
            return Inertia::render('Dashboard/Dashboard', []);
        }
    }
}
