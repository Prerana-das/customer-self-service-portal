<?php

namespace App\Http\Controllers\Website;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BillingController extends Controller
{
    public function index(Request $request) 
    {
        return Inertia::render('Billing/Show');
    }

    public function billingPreferences(Request $request)
    {

    }

    
}
