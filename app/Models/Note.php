<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Note extends Model
{
    use SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'slug',
        'color',
        'cover',
        'description',
        'content',
        'is_private',
        'is_sticky',
        'sharable_link',
        'shared_password',
        'user_id',
    ];

    protected $casts = [
        'is_private' => 'boolean',
        'is_shared' => 'boolean',
        'is_sticky' => 'boolean',
    ];

    protected static function booted()
    {
        static::saved(function ($note) {
            if (request()->filled('tags')) {
                $note->syncTags(request('tags'));
            }
        });
        static::forceDeleted(function ($note) {
            $note->tags()->detach();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')->withTimestamps();
    }

    /**
     * Sync tags to note
     * @param array $tags (could be array of IDs or names)
     */
    public function syncTags(array $tags)
    {
        $tagIds = collect($tags)->map(function ($tag) {
            if (is_numeric($tag)) {
                return (int) $tag;
            }

            $tagModel = \App\Models\Tag::firstOrCreate(
                ['name' => ucwords($tag['value'])],
                ['slug' => Str::slug($tag['value'])]
            );

            return $tagModel->id;
        });

        $this->tags()->sync($tagIds);
    }
}
