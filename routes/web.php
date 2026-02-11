<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Website\DashboardController;


Route::get('/', [DashboardController::class, 'index'])->name('dashboard');


// Route::middleware(['auth:sanctum', 'abilities:Primary'])->group(function () {
//     Route::post('/billing-preference', BillingPreferenceController::class);
// });

// Login page
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Register page
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});
