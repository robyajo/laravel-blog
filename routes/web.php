<?php

use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::controller(ProductController::class)->prefix('products')->group(function () {
        Route::get('/', 'index')->name('products.index');
        Route::get('/create', 'create')->name('products.create');
        Route::post('/store', 'store')->name('products.store');
        Route::get('/show/{id}', 'show')->name('products.show');
        Route::get('/edit/{id}', 'edit')->name('products.edit');
        Route::delete('/destroy/{id}', 'destroy')->name('products.destroy');
    });
    Route::controller(CategoryProductController::class)->prefix('category-products')->group(function () {
        Route::get('/', 'index')->name('cat_products.index');
        Route::get('/create', 'create')->name('cat_products.create');
        Route::post('/store', 'store')->name('cat_products.store');
        Route::get('/show/{id}', 'show')->name('cat_products.show');
        Route::get('/edit/{id}', 'edit')->name('cat_products.edit');
        Route::put('/update/{id}', 'update')->name('cat_products.update');
        Route::delete('/destroy/{id}', 'destroy')->name('cat_products.destroy');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
