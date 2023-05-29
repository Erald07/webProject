<?php


namespace App\Filters;

class SortingFilter
{
    public function filter($builder, $value)
    {   
        if($value == 'default'){
            return $builder;
        }
        if($value == 'latest'){
            return $builder->orderBy('created_at', 'desc');
        }
        if($value == 'price-low-to-high'){
            return $builder->orderBy('selling_price', 'asc');
        }
        if($value == 'price-low-to-high'){
            return $builder->orderBy('selling_price', 'desc');
        }
    }
}