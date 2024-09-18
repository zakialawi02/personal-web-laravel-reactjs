<?php

namespace App\Http\Controllers;

use App\Models\Pesan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PesanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Pesan',
        ];

        $pesan = Pesan::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search') && request()->get("search") != "") {
            $pesan = $pesan->where('pesan', 'like', '%' . request()->get("search") . '%')
                ->orWhere('pesan_dari', 'like', '%' . request()->get("search") . '%');
        }

        $pesan = $pesan->paginate(25)->withQueryString();

        return Inertia::render('Dashboard/Pesan/Index', [
            'meta' => $data,
            'messages' => $pesan,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storePesan(Request $request)
    {
        $messages = [
            'pesan.required' => 'Message is required',
            'pesan.min' => 'Message must be at least 5 characters',
            'pesan_dari.nullable' => 'Message from can be empty'
        ];

        $request->validate([
            'pesan' => 'required|min:5',
            'pesan_dari' => 'nullable',
        ], $messages);

        Pesan::create([
            'pesan' => $request->pesan,
            'pesan_dari' => $request->pesan_dari,
        ]);

        return response()->json(['message' => 'Message sent'], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesan $pesan)
    {
        if (Pesan::where('id', $pesan->id)->delete()) {
            return redirect()->back()->with('success', 'Project deleted successfully');
        }

        return redirect()->back()->with('error', 'Project delete failed');
    }

    public function getPesan()
    {
        $pesan = Pesan::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $pesan
        ], 200);
    }
}
