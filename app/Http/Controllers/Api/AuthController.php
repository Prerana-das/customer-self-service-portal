<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Actions\Website\Dashboard\UserDashboardAction;

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

    public function getUser(Request $request, UserDashboardAction $userDashboardAction)
    {
        return $userDashboardAction->userData($request);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
