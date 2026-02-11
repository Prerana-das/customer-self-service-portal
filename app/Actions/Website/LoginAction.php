<?php declare(strict_types=1);

namespace App\Actions\Website;

use App\DTO\Auth\LoginDto;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginAction
{
    public function execute(LoginDto $loginDto): array
    {
        // Attempt login using DTO data
        if (! Auth::attempt([
            'email' => $loginDto->email,
            'password' => $loginDto->password,
        ])) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $user = Auth::user();

        // Delete old tokens
        $user->tokens()->delete();

        $token = $user->createToken(
            'customer-portal',
            [$user->user_type]
        )->plainTextToken;

        return [
            'token' => $token,
            'user'  => [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'user_type' => $user->user_type,
            ],
        ];
    }
}
