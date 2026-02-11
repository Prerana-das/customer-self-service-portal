<?php

namespace App\Models;

use App\Models\Site;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * IDE can auto-complete property names, Show hints while coding, Detect type errors early.
 * 
 * @property int $id
 * @property string $meter_number
 * @property string $status
 * @property int $site_id
 *
 * This class inherits all methods from Eloquent Model (save(), find(), update(), etc)
 * @mixin Model
 */

class Meter extends Model
{
    /* To use factories for generating fake data. Seeding the database with test or mock data */
    use HasFactory;
    
    protected $table = 'meters';

    protected $fillable = [
        'meter_number',
        'status',
        'site_id',
        'type',
        'latest_reading',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
