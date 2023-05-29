<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\OrderItems;
use Illuminate\Http\Request;

class OrderItemsController extends Controller
{
    public function orderDetails($orderID)
    {
        $orderDetails = OrderItems::where('order_id', $orderID)->get();
        return response()->json([
            'status' => 200,
            'orderDetails' => $orderDetails,
        ]);
    }
}
