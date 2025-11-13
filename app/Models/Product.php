<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'model_path',
        'thumbnail_path'
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
