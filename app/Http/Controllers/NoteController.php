<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\NoteRequest;
use Illuminate\Support\Facades\Storage;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'title' => 'My Notes',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        $notes = Note::with('user', 'tags');

        // Search by title or description
        if ($request->filled('search')) {
            $notes->where(function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }
        // Filter by status (shared/private)
        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'shared') {
                $notes->where('is_private', false);
            } elseif ($request->status === 'private') {
                $notes->where('is_private', true);
            }
        }
        if ($request->filled('tag')) {
            $notes->whereHas('tags', function ($query) use ($request) {
                $query->where('name', $request->tag);
            });
        }
        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $notes->orderBy($sortField, $sortDirection);
        // Pagination
        $notes = $notes->paginate(30)->withQueryString();

        $tags = Tag::whereHas('notes')->withCount('notes')->get();

        return Inertia::render('Dashboard/Note/Index', [
            'meta' => $data,
            'notes' => $notes,
            'tags' => $tags,
            'queryParams' => $request->query() ?: null,
        ]);
    }


    public function create()
    {
        $data = [
            'title' => 'Create My Note',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        $tags = Tag::select('name as value')->get(); // penting: as value

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $data,
            'tagsList' => $tags
        ]);
    }

    public function store(NoteRequest $request)
    {
        $data = $request->all();

        Note::create($data);

        return redirect()->route('admin.note.index')->with('success', 'Note created successfully');
    }

    public function edit(Note $note)
    {
        $data = [
            'title' => 'Edit My Note',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        $tags = Tag::select('name as value')->get(); // penting: as value

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $data,
            'noteData' => $note->load('tags:name'),
            'tagsList' => $tags
        ]);
    }


    public function update(NoteRequest $request, Note $note)
    {
        $data = $request->all();

        $note->update($data);

        return redirect()->route('admin.note.index')->with('success', 'Note updated successfully');
    }

    public function update2(NoteRequest $request, Note $note)
    {
        $data = $request->all();

        $note->update($data);

        return redirect()->back()->with('success', 'Note updated successfully');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'upload' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // 'upload' adalah nama default input file dari CKEditor 5
        ]);

        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/uploads', $filename); // Simpan di storage/app/public/uploads

            // URL yang akan dikembalikan ke CKEditor 5
            $url = Storage::url($path);

            return response()->json([
                'url' => $url
            ]);
        }

        return response()->json(['error' => ['message' => 'Upload failed']], 500);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->route('admin.note.index')->with('success', 'Note deleted successfully');
    }

    public function pinNote(Note $note)
    {
        $note->update(['is_sticky' => true]);
        return redirect()->route('admin.note.index')->with('success', 'Note pinned successfully');
    }

    public function unpinNote(Note $note)
    {
        $note->update(['is_sticky' => false]);
        return redirect()->route('admin.note.index')->with('success', 'Note unpinned successfully');
    }

    public function indexPublic(Request $request)
    {
        $data = [
            'title' => 'My Notes',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        $notes = Note::with('user', 'tags')->where('is_private', false);

        return Inertia::render('Front/Note/Index', [
            'meta' => $data,
            'notes' => $notes->paginate(30)->withQueryString(),
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function edit2(Note $note, $slug)
    {
        if ($note->slug !== $slug) {
            abort(404);
        }
        if (($note->is_private && !auth()->check()) || (auth()->check() && auth()->id() !== $note->user_id)) {
            abort(403);
        }

        $data = [
            'title' => $note->title || 'My Note',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        return Inertia::render('Front/Note/Edit', [
            'meta' => $data,
            'note' => $note
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Note  $note
     * @return \Inertia\Response
     */
    public function showPublic(Note $note, $slug)
    {
        if ($note->slug !== $slug) {
            abort(404);
        }
        if (($note->is_private && !auth()->check()) || (auth()->check() && auth()->id() !== $note->user_id)) {
            abort(403);
        }
        $data = [
            'title' => $note->title || 'My Note',
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];

        return Inertia::render('Front/Note/Show', [
            'meta' => $data,
            'note' => $note
        ]);
    }

    /**
     * Short link for a shared note.
     * This is used when the user wants to share a note.
     *
     * @param Note $note
     * @return RedirectResponse
     */
    public function sharedShow(Note $note)
    {
        return redirect()->route('note.show', ['note' => $note->id, 'slug' => $note->slug]);
    }
}
