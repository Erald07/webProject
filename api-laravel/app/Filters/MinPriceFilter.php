<?php


namespace App\Filters;

class MinPriceFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('original_price', '>=', $value);
    }
}