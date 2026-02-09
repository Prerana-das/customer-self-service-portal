<?php

namespace App\Models;

use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * IDE can auto-complete property names, Show hints while coding, Detect type errors early.
 * 
 * @property int $id
 * @property string $name
 * @property string|null $contact_email
 * @property string|null $phone
 * @property string|null $billing_address
 *
 * This class inherits all methods from Eloquent Model (save(), find(), update(), etc)
 * @mixin Model
 */

class Customer extends Model
{
    /* To use factories for generating fake data. Seeding the database with test or mock data */
    use HasFactory;

    protected $table = 'customers';

    protected $fillable = [
        'name',
        'contact_email',
        'phone',
        'billing_address',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function sites(): HasMany
    {
        return $this->hasMany(Site::class);
    }

}
