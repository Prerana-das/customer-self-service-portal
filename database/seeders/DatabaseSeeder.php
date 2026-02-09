<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\User;
use App\Models\Meter;
use App\Models\Customer;
use Illuminate\Database\Seeder;
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
        ]);

        Customer::factory()
            ->count(3)  // Create 3 customers
            ->hasUsers(2)   // 2 users per customer
            ->hasSites(2)   // 2 sites per customer
            ->create()
            ->each(function ($customer) {
                //For each site create meters and bills
                $customer->sites->each(function ($site) {
                    Meter::factory()->count(2)->create(['site_id' => $site->id]);
                    Bill::factory()->count(2)->create(['site_id' => $site->id]);
                });
        });
    }
}
