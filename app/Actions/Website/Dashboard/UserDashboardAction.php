<?php declare(strict_types=1);

namespace App\Actions\Website\Dashboard;

use Illuminate\Http\Request;

class UserDashboardAction
{
    public function userData(Request $request)
    {
        $user = $request->user()->load('customer');

        $customer = $user->customer;

        // Get all sites 
        $sites = $customer->sites()->select('id', 'name')->get();

        // Determine active site (first site by default)
        $activeSiteId = request()->query('site_id') 
            ?? $sites->first()?->id;

        $activeSite = $customer->sites()->find($activeSiteId);

        if (!$activeSite) {
            return response()->json([
                'message' => 'No site found'
            ], 404);
        }

        // Calculate stats 
        $stats = [
            'sitesCount' => $sites->count(),
            'activeMeters' => $activeSite->meters()
                ->where('status', 'active')
                ->count(),
            'lastBill' => $activeSite->bills()
                ->latest()
                ->value('amount') ?? 0,
            'outstanding' => $activeSite->bills()
                ->where('status', 'unpaid')
                ->sum('amount') ?? 0,
        ];

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
            ],
            'sites' => $sites,
            'active_site_id' => $activeSite->id,
            'stats' => $stats,
        ]);
    }
}
