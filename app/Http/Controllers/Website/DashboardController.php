<?php

namespace App\Http\Controllers\Website;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Actions\Website\Dashboard\UserDashboardAction;


class DashboardController extends Controller
{
    public function index(Request $request, UserDashboardAction $userDashboardAction) 
    {
        return Inertia::render('Dashboard/Index');
    }
}
