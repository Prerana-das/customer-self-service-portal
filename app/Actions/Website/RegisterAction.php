<?php declare(strict_types=1);

namespace App\Actions\Website;

use App\Models\User;
use App\Models\Customer;
use App\DTO\Auth\RegisterDto;
use Illuminate\Support\Facades\Hash;

class RegisterAction
{
    public function execute(RegisterDto $registerDto)
    {
        $customer = Customer::first(); 

        $user = User::create([
            'name'        => $registerDto->name,
            'email'       => $registerDto->email,
            'password'    => Hash::make($registerDto->password),
            'user_type'   => 'Primary',
            'customer_id' => $customer->id,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }
}
