<?php

namespace App\Models;

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
            $note->syncTags(request('tags'));
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function syncTags($tags)
    {
        if (request()->has('tags')) {
            $this->tags()->sync($tags);
        }
    }
}
