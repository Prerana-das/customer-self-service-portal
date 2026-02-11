<?php declare(strict_types=1);

namespace App\Actions\Website\Site;

use Carbon\Carbon;
use App\Models\Site;

class SiteOverviewAction
{
    public function execute(Site $site): array
    {
        $meters = $site->meters()
                        ->get()
                        ->map(function ($meter) {
                            return [
                                'id' => $meter->id,
                                'meter_id' => $meter->meter_number,
                                'type' => $meter->type,
                                'latest_reading' => $meter->latest_reading,
                                'last_updated' => $meter->updated_at,
                            ];
                        });

        $consumption = $this->monthlyConsumption($site);

        return [
            'site' => [
                'id' => $site->id,
                'name' => $site->name,
            ],
            'meters' => $meters,
            'consumption' => $consumption,
        ];
    }

    private function monthlyConsumption(Site $site): array
    {
        return $site->bills()
            ->where('created_at', '>=', now()->subMonths(6))
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($row) {
                return [
                    'month' => Carbon::create()->month($row->month)->format('M'),
                    'usage' => $row->total,
                ];
            })
            ->toArray();
    }
}
