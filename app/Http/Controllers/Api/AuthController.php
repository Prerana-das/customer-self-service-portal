<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\Bill;
use App\Models\User;
use App\Models\Meter;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
     public function register(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
        ]);

        // For simplicity, assign to a default customer (or you can create a new customer)
        $customer = Customer::first(); // or create a new one if needed

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'Primary', // default type
            'customer_id' => $customer->id,
        ]);

        // Create Sanctum token
        $token = $user->createToken('api-token')->plainTextToken;

        // Return response with token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    
    public function login(Request $request)
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $user = Auth::user();

        $user = $request->user();

        // Delete old tokens 
        $user->tokens()->delete();

        $token = $user->createToken(
            'customer-portal',
            [$user->user_type] // Primary / Authorised
        )->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'user_type' => $user->user_type,
            ],
        ]);
    }

     public function me(Request $request)
    {
        // return response()->json($request->user());


        $user = $request->user();

        // Load related customer
        $customer = $user->customer;

        // Count customer sites
        $sitesCount = $customer->sites()->count();

        // Count active meters
        $activeMetersCount = Meter::whereHas('site', function ($q) use ($customer) {
            $q->where('customer_id', $customer->id);
        })->where('status', 'active')->count();
        
        // Last bill 
        $lastBill = Bill::whereHas('site', function ($q) use ($customer) {
            $q->where('customer_id', $customer->id);
        })->latest()->first();

        // sum of unpaid bills
        $outstanding = Bill::whereHas('site', function ($q) use ($customer) {
            $q->where('customer_id', $customer->id);
        })->where('status', 'unpaid')->sum('amount');

        return response()->json([
            'user' => $user,
            'customer' => $customer,
            'stats' => [
                'sites' => $sitesCount,
                'activeMeters' => $activeMetersCount,
                'lastBill' => $lastBill ? $lastBill->amount : 0,
                'outstanding' => $outstanding,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
