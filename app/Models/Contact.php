<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'avatar',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];


    // public function getAvatarUrlAttribute()
    // {
    //     return $this->avatar ? asset('storage/' . $this->avatar) : asset('images/default-avatar.png');
    // }
}
