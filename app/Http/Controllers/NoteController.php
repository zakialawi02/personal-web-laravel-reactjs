<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\Note\NoteRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Note\UploadImageRequest;
use App\Http\Requests\Note\CheckPasswordRequest;

class NoteController extends Controller
{
    /**
     * Get shared data for Inertia views.
     */
    private function getSharedData(string $title): array
    {
        return [
            'title' => $title,
            'base_url' => rtrim(env('APP_URL'), '/'),
        ];
    }

    /**
     * Apply search and filters to the note query.
     */
    protected function applySearchAndFilters($query, Request $request): void
    {
        // Search by title or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status (shared/private)
        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'shared') {
                $query->where('is_private', false);
            } elseif ($request->status === 'private') {
                $query->where('is_private', true);
            }
        }

        // Filter by Tag
        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('name', $request->tag);
            });
        }
    }

    public function index(Request $request)
    {
        $notes = Note::with('user', 'tags');

        $this->applySearchAndFilters($notes, $request);

        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $notes->orderBy($sortField, $sortDirection);

        $tags = Tag::whereHas('notes')->withCount('notes')->get();

        return Inertia::render('Dashboard/Note/Index', [
            'meta' => $this->getSharedData('My Notes'),
            'notes' => $notes->paginate(30)->withQueryString(),
            'tags' => $tags,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function create()
    {
        $tags = Tag::select('name as value')->get();

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $this->getSharedData('Create My Note'),
            'tagsList' => $tags
        ]);
    }

    public function store(NoteRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        Note::create($data);

        return redirect()->route('admin.note.index')->with('success', 'Note created successfully');
    }

    public function edit(Note $note)
    {
        $this->authorize('update', $note);

        $tags = Tag::select('name as value')->get();

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $this->getSharedData('Edit My Note'),
            'noteData' => $note->load('tags:name'),
            'tagsList' => $tags
        ]);
    }

    public function update(NoteRequest $request, Note $note)
    {
        $this->authorize('update', $note);

        $data = $request->validated();
        // user_id check is handled by policy, and usually we don't change owner on update unless intended
        // $data['user_id'] = auth()->id(); // Preserving original owner is usually better, or ensure policy checks.
        // But original code enforced overwriting user_id to auth()->id(). Let's keep it if that's intended,
        // though typically update shouldn't change owner. The policy ensures only owner usually updates.
        // If the original intention was to "claim" it? No, it was `if ($note->user_id !== auth()->id()) abort`.
        // So safe to assume owner is same.

        $note->update($data);

        return redirect()->route('admin.note.index')->with('success', 'Note updated successfully');
    }

    public function updateAndBack(NoteRequest $request, Note $note)
    {
        $this->authorize('update', $note);

        $note->update($request->validated());

        return redirect()->back()->with('success', 'Note updated successfully');
    }

    public function uploadImage(UploadImageRequest $request)
    {
        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/uploads', $filename);

            return response()->json([
                'url' => Storage::url($path)
            ]);
        }

        return response()->json(['error' => ['message' => 'Upload failed']], 500);
    }

    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);
        $note->delete();
        return redirect()->route('admin.note.index')->with('success', 'Note deleted successfully');
    }

    public function pin(Note $note)
    {
        $this->authorize('update', $note);
        $note->update(['is_sticky' => true]);
        return redirect()->route('admin.note.index')->with('success', 'Note pinned successfully');
    }

    public function unpin(Note $note)
    {
        $this->authorize('update', $note);
        $note->update(['is_sticky' => false]);
        return redirect()->route('admin.note.index')->with('success', 'Note unpinned successfully');
    }

    public function publicIndex(Request $request)
    {
        $notes = Note::with('user', 'tags')->where('is_private', false);

        return Inertia::render('Front/Note/Index', [
            'meta' => $this->getSharedData('My Notes'),
            'notes' => $notes->paginate(30)->withQueryString(),
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function publicEdit(Note $note, $slug)
    {
        if ($note->slug !== $slug) {
            abort(404);
        }

        $this->authorize('update', $note);

        return Inertia::render('Front/Note/Edit', [
            'meta' => $this->getSharedData($note->title ?: 'My Note'),
            'note' => $note
        ]);
    }

    /**
     * Display the specified resource (Canonical URL logic).
     */
    public function publicShow(Request $request, Note $note, $slug)
    {
        if ($note->slug !== $slug) {
            abort(404);
        }

        // Strict Access: Only the owner can view the canonical URL
        $this->authorize('view', $note);

        // Hide sensitive data
        $note->makeHidden(['shared_password']);

        return Inertia::render('Front/Note/Show', [
            'meta' => $this->getSharedData($note->title ?: 'My Note'),
            'note' => $note
        ]);
    }

    public function checkPassword(CheckPasswordRequest $request, Note $note)
    {
        if ($note->shared_password === $request->password) {
            $request->session()->put('note_access_' . $note->id, true);
            return back();
        }

        return back()->withErrors(['password' => 'Incorrect password']);
    }

    /**
     * Short link for a shared note.
     */
    public function showShared(Request $request, Note $note)
    {
        // Check availability
        if ($note->is_private) {
            // If private, only owner can view, effectively falling back to authorized view logic
            // But strict shared logic might demand 403 instantly if not owner
            if (!auth()->check() || auth()->user()->cannot('view', $note)) {
                abort(403);
            }
        }

        // Check password protection
        if ($note->shared_password) {
            $sessionKey = 'note_access_' . $note->id;
            if (!$request->session()->has($sessionKey)) {
                return Inertia::render('Front/Note/PasswordPrompt', [
                    'meta' => $this->getSharedData('Password Required'),
                    'note' => $note->only(['id', 'slug', 'title', 'user_id', 'created_at']),
                ]);
            }
        }

        $note->makeHidden(['shared_password']);

        return Inertia::render('Front/Note/Show', [
            'meta' => $this->getSharedData($note->title ?: 'My Note'),
            'note' => $note
        ]);
    }
}
