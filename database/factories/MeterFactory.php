<?php

namespace Database\Factories;

use App\Models\Site;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meter>
 */
class MeterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /* bothify() generates a string based on a pattern. The pattern can include # for digits and ? for letters.*/
        
        return [
            'meter_number' => $this->faker->unique()->bothify('MTR-#####'),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'site_id' => Site::factory(),
        ];
    }
}
