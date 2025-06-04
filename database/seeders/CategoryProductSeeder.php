<?php

namespace Database\Seeders;

use App\Models\CategoryProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        CategoryProduct::create([
            'name' => 'Electronics',
            'description' => 'Devices and gadgets',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'electronics',
            'is_active' => true,
        ]);
        CategoryProduct::create([
            'name' => 'Books',
            'description' => 'Various genres of books',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'books',
            'is_active' => true,
        ]);
        CategoryProduct::create([
            'name' => 'Clothing',
            'description' => 'Apparel and accessories',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'clothing',
            'is_active' => true,
        ]);

        $categories = [
            'Shoes',
            'Smartphones',
            'Laptops',
            'Watches',
            'Furniture',
            'Sports',
            'Gaming',
            'Beauty',
            'Food',
            'Toys',
            'Art',
            'Music',
            'Garden',
            'Tools',
            'Automotive',
            'Health',
            'Pets',
            'Baby',
            'Office',
            'Outdoor'
        ];

        for ($i = 0; $i < 50; $i++) {
            $name = $categories[array_rand($categories)] . ' ' . fake()->words(2, true);
            CategoryProduct::create([
                'name' => $name,
                'description' => fake()->sentence(),
                'user_id' => 1,
                'slug' => Str::slug($name),
                'is_active' => true,
            ]);
        }
    }
}
