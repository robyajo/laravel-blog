<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryProduct extends Model
{
    use SoftDeletes;
    protected $table = 'category_products';

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'slug',
        'is_active',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function getSlugAttribute()
    {
        return $this->attributes['slug'] ?? str($this->name);
    }
}
