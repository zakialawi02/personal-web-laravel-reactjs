<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\ProjectImages;
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
        // dd($request->all());
        $request->validate([
            'name' => 'required|min:4|max:200',
            'description' => 'nullable|max:5000',
            'cover_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'techs' => 'nullable',
            'project_image.*' => 'nullable',
        ]);

        $data = $request->all();
        if (isset($data['techs']) && !empty($data['techs'])) {
            $data['techs'] = json_encode($data['techs']);
        }

        if ($request->hasFile('cover_image') && $request->file('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/img/' .  $filename);
            $path = asset('storage/img/' . $filename);
            $data['cover_image'] = $filename;
        }
        $project = Project::create($data);

        // Handle project_image array if present
        if (isset($data['project_image']) && is_array($data['project_image'])) {
            if ($request->hasFile('project_image')) {
                foreach ($request->file('project_image') as $file) {
                    $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('public/img', $filename);
                    ProjectImages::create([
                        'project_id' => $project->id,
                        'image' => $filename,
                    ]);
                }
            }
         }

        // dd($data);

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

        $projectData = Project::with('images')->where('id', $project->id)->first();

        return Inertia::render('Front/ShowProject', [
            'meta' => $data,
            'procjData' => $projectData
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

        $project = Project::with('images')->where('id', $project->id)->first();
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

        // Handle project_image array if present
        if (isset($data['project_image']) && is_array($data['project_image'])) {
            if ($request->hasFile('project_image')) {
                foreach ($request->file('project_image') as $file) {
                    $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('public/img', $filename);
                    ProjectImages::create([
                        'project_id' => $project->id,
                        'image' => $filename,
                    ]);
                }
            }
        }

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

        // Delete all related images
        $images = ProjectImages::where('project_id', $project->id)->get();
        foreach ($images as $image) {
            Storage::delete('public/img/' . $image->image);
            $image->delete();
        }

        if ($project) {
            return redirect()->back()->with('success', 'Project deleted successfully');
        }

        return redirect()->back()->with('error', 'Project delete failed');
    }

    public function destroyScreenshot(request $request)
    {
        $data = $request->all();
        $filename = $data['fileName'];
        $image = ProjectImages::where('image', $filename)->first();
        $image->delete();
        Storage::delete('public/img/' . $filename);

        return redirect()->back()->with(['success', 'Screenshot deleted successfully'], 201);
    }
}
