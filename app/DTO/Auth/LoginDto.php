<?php declare(strict_types=1);

namespace App\DTO\Auth;
use Illuminate\Http\Request;

class LoginDto
{
    public function __construct(
        public string $email,
        public string $password,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('email'),
            $request->input('password')
        );
    }
}
