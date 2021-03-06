<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(BookableTableSeeder::class);
         $this->call(BookingTableSeeder::class);
         $this->call(ReviewsTableSeeder::class);
    }
}
