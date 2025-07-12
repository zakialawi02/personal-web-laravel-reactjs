<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\NoteRequest;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'title' => 'Manage My Notes',
        ];

        $notes = Note::with('user', 'tags');

        // Search by title or description
        if ($request->filled('search')) {
            $notes->where(function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        // Filter by status (shared/private)
        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'shared') {
                $notes->where('is_shared', true);
            } elseif ($request->status === 'private') {
                $notes->where('is_private', true);
            }
        }
        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $notes->orderBy($sortField, $sortDirection);
        // Pagination
        $notes = $notes->paginate(25)->withQueryString();

        return Inertia::render('Dashboard/Note/Index', [
            'meta' => $data,
            'notes' => $notes,
            'queryParams' => $request->query() ?: null,
        ]);
    }


    public function create()
    {
        $data = [
            'title' => 'Create My Note',
        ];

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $data
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
        ];

        return Inertia::render('Dashboard/Note/FormData', [
            'meta' => $data,
            'noteData' => $note
        ]);
    }

    public function update(NoteRequest $request, Note $note)
    {
        $data = $request->all();

        $note->update($data);

        return redirect()->route('admin.note.index')->with('success', 'Note updated successfully');
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
}
