<?php

namespace App\Models;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * IDE can auto-complete property names, Show hints while coding, Detect type errors early.
 * 
 * @property int $id
 * @property string $name
 * @property string|null $address
 * @property int $customer_id
 *
 * This class inherits all methods from Eloquent Model (save(), find(), update(), etc)
 * @mixin Model
 */

class Site extends Model
{
    /* To use factories for generating fake data. Seeding the database with test or mock data */
    use HasFactory;

    protected $table = 'sites';

    protected $fillable = [
        'name',
        'address',
        'post_code',
        'latitude',
        'longitude',
        'customer_id',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function meters(): HasMany
    {
        return $this->hasMany(Meter::class);
    }

    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class);
    }
}
