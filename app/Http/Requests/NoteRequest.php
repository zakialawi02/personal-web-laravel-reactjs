<?php

namespace App\Http\Requests;

use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;

class NoteRequest extends FormRequest
{
    public function prepareForValidation()
    {

        $this->merge([
            'slug' => (empty($this->slug)) ? now()->timestamp . Str::random(30) : Str::slug($this->slug)
        ]);
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $note = $this->route('note');
        return [
            'title' => 'required|min:4|max:200',
            'slug' => 'required|unique:notes,slug,' . $note?->id,
            'color' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:1024',
            'description' => 'nullable|string|max:500',
            'content' => 'required|string',
            'is_private' => 'required|boolean',
            'is_sticky' => 'required|boolean',
            'sharable_link' => 'nullable|string|max:200',
            'shared_password' => 'nullable|string|max:200',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
