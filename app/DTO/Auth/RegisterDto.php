<?php declare(strict_types=1);

namespace App\DTO\Auth;
use Illuminate\Http\Request;

class RegisterDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('name'),
            $request->input('email'),
            $request->input('password'),
        );
    }
}
