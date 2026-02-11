<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Website\SiteController;
use App\Http\Controllers\Website\DashboardController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (token required)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/', [DashboardController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/switch-site/{site}', [SiteController::class, 'switch']);
});

