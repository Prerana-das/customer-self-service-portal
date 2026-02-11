<?php

namespace App\Http\Controllers\Website;

use App\Models\Site;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Actions\Website\SiteAction;
use App\Http\Controllers\Controller;
use App\Actions\Website\Site\SiteOverviewAction;


class SiteController extends Controller
{
    public function index(Request $request) 
    {
        return Inertia::render('Sites/Show', [
            'id' => $request->route('id'),
        ]);
    }

    public function overview(Site $site, SiteOverviewAction $siteOverviewAction)
    {
        // check site belongs to authenticated user
        $user = request()->user();

        if ($site->customer_id !== $user->customer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $siteOverviewAction->execute($site);
    }

}
