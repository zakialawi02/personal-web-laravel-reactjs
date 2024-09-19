<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PesanController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->as('api.')->group(function () {
    // route here
    Route::get('/getPesan', [PesanController::class, 'getPesan'])->name('getPesan');
    Route::post('/storePesan', [PesanController::class, 'storePesan'])->name('storePesan');

    Route::get('getPortfolio', [ProjectController::class, 'getPortfolio'])->name('getPortfolio');
    Route::get('/getPhotosGallery', [GalleryController::class, 'getPhotosGallery'])->name('getPhotosGallery');
});
