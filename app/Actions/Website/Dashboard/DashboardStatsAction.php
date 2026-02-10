<?php declare(strict_types=1);

namespace App\Actions\Website\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Meter;

class DashboardStatsAction
{
    public function execute(Request $request)
    {
        return Inertia::render('Dashboard/Index');
    }
}
