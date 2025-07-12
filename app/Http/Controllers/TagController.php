<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Manage Tags',
        ];

        $tags = Tag::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search') && request()->get("search") != "") {
            $tags = $tags->where('name', 'like', '%' . request()->get("search") . '%')
                ->orWhere('description', 'like', '%' . request()->get("search") . '%');
        }

        $tags = $tags->paginate(25)->withQueryString();

        return Inertia::render('Dashboard/Tag/Index', [
            'meta' => $data,
            'tags' => $tags,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'title' => 'Create Tag',
        ];

        return Inertia::render('Dashboard/Tag/FormData', [
            'meta' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TagRequest $request)
    {
        $data = $request->validated();

        Tag::create($data);

        return redirect()->route('admin.tag.index')->with('success', 'Tag created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        $data = [
            'title' => 'Edit Tag',
        ];

        return Inertia::render('Dashboard/Tag/FormData', [
            'meta' => $data,
            'tagData' => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TagRequest $request, Tag $tag)
    {
        $data = $request->validated();

        $tag->update($data);

        return redirect()->route('admin.tag.index')->with('success', 'Tag updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        Tag::where('slug', $tag->slug)->delete();

        return redirect()->route('admin.tag.index')->with('success', 'Tag deleted successfully');
    }
}
