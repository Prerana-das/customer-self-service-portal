<?php declare(strict_types=1);

namespace App\Actions\Website\Dashboard;

use App\Models\Site;
use Illuminate\Http\Request;

class UserDashboardAction
{
    public function userData(Request $request, $siteId = null)
    {
        $user = $request->user()->load('customer');

        $customer = $user->customer;

        // Get all sites 
        $sites = $customer->sites()->select('id', 'name')->get();

        $activeSite = $siteId
            ? $sites->firstWhere('id', $siteId)
            : $sites->first();

        // Calculate stats 
         $stats = [
            'sitesCount' => $sites->count(),
            'activeMeters' => 0,
            'lastBill' => 0,
            'outstanding' => 0,
        ];
        if ($activeSite) {
            $stats = $this->siteStats($activeSite, $stats['sitesCount']);
        }

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
            'active_site_id' => $activeSite?->id ?? null,
            'stats' => $stats,
        ]);
    }


     public function siteStats(Site $site, int $sitesCount): array
    {
        return [
            'sitesCount' => $sitesCount,
            'activeMeters' => $site->meters()
                ->where('status', 'active')
                ->count(),

            'lastBill' => optional(
                $site->bills()->latest()->first()
            )->amount ?? 0,

            'outstanding' => $site->bills()
                ->where('status', 'unpaid')
                ->sum('amount'),
        ];
    }
}
