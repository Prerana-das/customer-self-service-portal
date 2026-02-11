<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Website\SiteController;
use App\Http\Controllers\Website\BillingController;
use App\Http\Controllers\Website\DashboardController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Login page
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Register page
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});

// Site details page
Route::get('/sites/{id}', [SiteController::class, 'index'])->name('site');

//Billing
Route::get('/billing', [BillingController::class, 'index'])->name('billing');