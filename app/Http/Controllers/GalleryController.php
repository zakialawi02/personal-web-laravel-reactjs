<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{

    public function index2()
    {
        return Inertia::render('Front/Gallery/Index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Manage My Gallery',
        ];

        $gallery = Gallery::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search') && request()->get("search") != "") {
            $gallery = $gallery->where('name', 'like', '%' . request()->get("search") . '%')
                ->orWhere('image', 'like', '%' . request()->get("search") . '%');
        }

        $gallery = $gallery->paginate(25)->withQueryString();

        return Inertia::render('Dashboard/Gallery/Index', [
            'meta' => $data,
            'galleries' => $gallery,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:4|max:100',
            'type' => 'required|in:photo,design',
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $data = $request->all();
        if ($request->hasFile('image') && $request->file('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/img/gallery/' .  $filename);
            $path = asset('storage/img/gallery/' . $filename);
            $data['image'] = $filename;
        }

        $gallery = Gallery::create($data);
        if ($gallery) {
            return redirect()->back()->with(['success', 'Gallery created successfully'], 201);
        }

        return redirect()->back()->with(['error', 'Gallery creation failed'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        if ($gallery->image) {
            Storage::delete('public/img/gallery/' . $gallery->image);
        }
        $gallery = Gallery::where('id', $gallery->id)->delete();

        if ($gallery) {
            return redirect()->back()->with('success', 'Gallery deleted successfully', 201);
        }

        return redirect()->back()->with('error', 'Gallery delete failed', 400);
    }


    public function getPhotosGallery()
    {
        if (request('max')) {
            $images = Gallery::where('type', 'photo')->take(request('max'))->get();
        } else {
            $images = Gallery::where('type', 'photo')->get();
        }

        return response()->json($images);
    }
}
