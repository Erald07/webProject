<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'email',
        'firstname',
        'lastname',
        'phone',
        'zipcode',
        'address',
        'city',
        'state',
        'payment_id',
        'payment_mode',
        'tracking_no',
        'status',
    ];
    public function orderitems(){
        return $this->hasMany(Orderitems::class, 'order_id', 'id');
    }
}
