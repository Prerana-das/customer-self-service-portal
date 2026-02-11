<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\DTO\Auth\LoginDto;
use Illuminate\Http\Request;
use App\DTO\Auth\RegisterDto;
use App\Http\Controllers\Controller;
use App\Actions\Website\RegisterAction;
use App\Actions\Website\LoginAction;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Actions\Website\Dashboard\UserDashboardAction;

class AuthController extends Controller
{
     public function register(RegisterRequest $request, RegisterAction $registerAction)
    {
        return $registerAction->execute(RegisterDto::fromRequest($request));
    }
    
    public function login(LoginRequest $request, LoginAction $loginAction)
    {
        return $loginAction->execute(LoginDto::fromRequest($request));
    }

    public function getUser(Request $request, UserDashboardAction $userDashboardAction)
    {
        $siteId = $request->query('site_id');

        return $userDashboardAction->userData($request, $siteId);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
