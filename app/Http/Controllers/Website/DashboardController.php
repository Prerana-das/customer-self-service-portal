<?php

namespace App\Http\Controllers\Website;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Actions\Website\Dashboard\DashboardStatsAction;

class DashboardController extends Controller
{
    public function index(Request $request, DashboardStatsAction $dashboardStatsAction) 
    {
        return $dashboardStatsAction->execute($request);
    }
}
