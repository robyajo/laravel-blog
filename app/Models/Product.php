<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
        'category_id',
        'stock',
        'sku',
        'barcode',
        'brand',
        'user_id',
        'slug',
        'is_active',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(CategoryProduct::class);
    }
    public function getSlugAttribute()
    {
        return $this->attributes['slug'] ?? str($this->name);
    }
}
