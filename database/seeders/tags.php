<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class tags extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::insert([
            ['name' => 'Laravel', 'slug' => Str::slug('Laravel')],
            ['name' => 'PHP', 'slug' => Str::slug('PHP')],
            ['name' => 'Tips', 'slug' => Str::slug('Tips')],
        ]);
    }
}
