<?php

namespace App\Models;

use App\Filters\ProductFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
class Product extends Model
{
    use HasFactory;
    protected $table= 'products';
    
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'original_price',
        'selling_price',
        'quantity',
        'warranty',
        'photo',
        'featured',
        'popular',
        'status',
    ];
    protected $with = ['orderitem', 'category'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function orderitem()
    {
        return $this->belongsTo(OrderItems::class, 'product_id', 'id');
    }
    public function scopeFilter(Builder $builder, $request)
    {
        return (new ProductFilter($request))->filter($builder);
    }
}
