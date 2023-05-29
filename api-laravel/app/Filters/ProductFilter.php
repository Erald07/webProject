<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class ProductFilter extends AbstractFilter
{
    protected $filters = [
        'min_price' => MinPriceFilter::class,
        'max_price' => MaxPriceFilter::class,
        'orderBy' => SortingFilter::class,
    ];
}