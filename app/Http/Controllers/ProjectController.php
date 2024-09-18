<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Manage My Project',
        ];

        $project = Project::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search') && request()->get("search") != "") {
            $project = $project->where('name', 'like', '%' . request()->get("search") . '%')
                ->orWhere('description', 'like', '%' . request()->get("search") . '%');
        }

        $project = $project->paginate(25)->withQueryString();

        return Inertia::render('Dashboard/Project/Index', [
            'meta' => $data,
            'projects' => $project,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'title' => 'Create My Project',
        ];

        return Inertia::render('Dashboard/Project/FormData', [
            'meta' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|min:4|max:200',
            'description' => 'nullable|max:5000',
            'cover_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'techs' => 'nullable',
        ]);

        $data = $request->all();
        $data['techs'] = json_encode($data['techs']);

        if ($request->hasFile('cover_image') && $request->file('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/img/' .  $filename);
            $path = asset('storage/img/' . $filename);
            $data['cover_image'] = $filename;
        }
        // dd($data);
        $project = Project::create($data);

        return redirect()->route('admin.project.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $data = [
            'title' => 'View My Project',
        ];

        return Inertia::render('Front/ShowProject', [
            'meta' => $data,
            'procjData' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $data = [
            'title' => 'Edit My Project',
        ];

        $project->techs = json_decode($project->techs);

        return Inertia::render('Dashboard/Project/FormData', [
            'meta' => $data,
            'procjData' => $project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required|min:4|max:200',
            'description' => 'nullable|max:5000',
            'cover_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'techs' => 'nullable',
        ]);

        $data = $request->all();

        if ($request->hasFile('cover_image') && $request->file('cover_image') && $request->file('cover_image') != null) {
            // dd($data);
            if ($project->cover_image) {
                Storage::delete('public/img/' . $project->cover_image);
            }
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/img/' .  $filename);
            $path = asset('storage/img/' . $filename);
            $data['cover_image'] = $filename;
        }else{
            unset($data['cover_image']);
        }

        $project->update($data);

        return redirect()->route('admin.project.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        if ($project->image) {
            Storage::delete('public/img/' . $project->image);
        }
        $project = Project::where('id', $project->id)->delete();

        if ($project) {
            return redirect()->back()->with('success', 'Project deleted successfully');
        }

        return redirect()->back()->with('error', 'Project delete failed');
    }
}
