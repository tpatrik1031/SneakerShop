<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Custom Sneaker',
            'description' => 'Teljesen testreszabható sportcipő',
            'price' => 29999.00,
            'model_path' => '/models/model.glb',
            'thumbnail_path' => null
        ]);
    }
}
