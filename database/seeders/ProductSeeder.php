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
            'name' => 'Sample Product',
            'price' => 19.99,
            'description' => 'This is a sample product description.',
            'image' => 'sample-product.jpg',
            'category_id' => 1, // Assuming category with ID 1 exists
            'stock' => 100,
            'sku' => 'SKU123',
            'barcode' => 'BARCODE456',
            'brand' => 'Sample Brand',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'sample-product',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Another Product',
            'price' => 29.99,
            'description' => 'This is another product description.',
            'image' => 'another-product.jpg',
            'category_id' => 2, // Assuming category with ID 2 exists
            'stock' => 50,
            'sku' => 'SKU789',
            'barcode' => 'BARCODE012',
            'brand' => 'Another Brand',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'another-product',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Third Product',
            'price' => 39.99,
            'description' => 'This is the third product description.',
            'image' => 'third-product.jpg',
            'category_id' => 3, // Assuming category with ID 3 exists
            'stock' => 75,
            'sku' => 'SKU456',
            'barcode' => 'BARCODE789',
            'brand' => 'Third Brand',
            'user_id' => 1, // Assuming user with ID 1 exists
            'slug' => 'third-product',
            'is_active' => true,
        ]);
    }
}
