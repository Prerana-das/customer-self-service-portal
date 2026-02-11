<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\User;
use App\Models\Meter;
use App\Models\Customer;
use Illuminate\Database\Seeder;
use App\Models\BillingPreference;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'user_type' => 'Primary',
        ]);

        Customer::factory()
            ->count(3)  // Create 3 customers
            ->hasUsers(2)   // 2 users per customer
            ->hasSites(2)   // 2 sites per customer
            ->create()
            ->each(function ($customer) {
                // Assign test user to this customer
                User::where('id', 1)->update(['customer_id' => $customer->id]);
                
                //For each site create meters and bills
                $customer->sites->each(function ($site) {
                    Meter::factory()->count(2)->create([
                        'site_id' => $site->id,
                        'type' => fake()->randomElement(['Electric', 'Gas']),
                        'latest_reading' => fake()->randomFloat(2, 0, 2000),
                    ]);
                    Bill::factory()->count(2)->create(['site_id' => $site->id]);
                });

                //billing preference for each customer
                BillingPreference::factory()->create(['customer_id' => $customer->id]);
        });

    }
}
