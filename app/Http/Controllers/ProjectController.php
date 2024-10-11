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
    public function index2()
    {
        return Inertia::render('Front/Portfolio/Index');
    }


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

        // Mapping data untuk memotong description dan menambahkan script_tag()
        $project->getCollection()->transform(function ($item) {
            $item->description = strip_tags($item->description); // Menghapus semua tag HTML
            $item->description = Str::limit($item->description, 100); // Memotong description jadi 100 karakter
            return $item;
        });

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
            'project_image.*' => 'nullable',
        ]);

        $data = $request->all();
        if (isset($data['techs']) && !empty($data['techs'])) {
            $data['techs'] = json_encode($data['techs']);
        } else {
            unset($data['techs']);
        }

        if ($request->hasFile('cover_image') && $request->file('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/img/' .  $filename);
            $path = asset('storage/img/' . $filename);
            $data['cover_image'] = $filename;
        } else {
            unset($data['cover_image']);
        }
        // dd($data);

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

        return Inertia::render('Front/Portfolio/ShowProject', [
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
        } else {
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

        $project_id = $project->id;
        if ($project->cover_image) {
            Storage::delete('public/img/' . $project->cover_image);
        }
        $images = ProjectImages::where('project_id', $project_id)->get();
        $project = Project::where('id', $project->id)->delete();

        // Delete all related images
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

    public function getPortfolio()
    {
        $projects = Project::all();

        // Mapping data untuk memotong description dan menambahkan script_tag()
        $projects->transform(function ($item) {
            $item->description = strip_tags($item->description); // Menghapus semua tag HTML
            $item->description = Str::limit($item->description, 100); // Memotong description jadi 100 karakter
            return $item;
        });

        return response()->json($projects);
    }
}
