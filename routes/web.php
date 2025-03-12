<?php

use Inertia\Inertia;
use App\Models\Pesan;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PesanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Front/Home', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::prefix('dashboard')->as('admin.')->group(function () {
    Route::middleware(['auth', 'verified', 'role:admin,writer,user'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    });

    Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

        Route::resource('users', UserController::class)->except('create', 'edit');
        Route::get('/user/{user:id}', [UserController::class, 'getUser'])->name('getUser');


        Route::get('/my-project', [ProjectController::class, 'index'])->name('project.index');
        Route::post('/my-project', [ProjectController::class, 'store'])->name('project.store');
        Route::get('/my-project/create', [ProjectController::class, 'create'])->name('project.create');
        Route::get('/my-project/{project:id}', [ProjectController::class, 'edit'])->name('project.edit');
        Route::put('/my-project/{project:id}', [ProjectController::class, 'update'])->name('project.update');
        Route::delete('/my-project/{project:id}', [ProjectController::class, 'destroy'])->name('project.destroy');
        Route::post('/deleteScreenshot/', [ProjectController::class, 'destroyScreenshot'])->name('deleteScreenshot');

        Route::get('/my-gallery', [GalleryController::class, 'index'])->name('gallery');
        Route::post('/my-gallery', [GalleryController::class, 'store'])->name('gallery.store');
        Route::delete('/my-gallery/{gallery:id}', [GalleryController::class, 'destroy'])->name('gallery.destroy');


        Route::get('/empty', function () {
            return Inertia::render('EmptyPage');
        })->name('empty');

        Route::get('/pesan', [PesanController::class, 'index'])->name('pesan.index');
        Route::delete('/pesan/{pesan:id}', [PesanController::class, 'destroy'])->name('pesan.destroy');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

Route::get('/gallery', [GalleryController::class, 'index2'])->name('gallery');
Route::get('/my-portfolio', [ProjectController::class, 'index2'])->name('myproject');

Route::get('/project/{project:id}', [ProjectController::class, 'show'])->name('project.show');

Route::post('/storePesan', [PesanController::class, 'storePesan'])->name('storePesan');


require __DIR__ . '/auth.php';
