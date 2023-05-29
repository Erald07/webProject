<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders =  Order::where('status', '!=', 2)->get();
        return response()->json([
            'status' =>200,
            'orders' =>$orders,
        ]);
    }
    public function view($id)
    {
        $order = Order::find($id);
        if($order){
            return response()->json([
                'status' => 200,
                'order' => $order,
            ]);
        }
        else{
            return response()->json([
                'status' => 404,
                'order' => "No Order ID Found",
            ]);
        }
    }
    public function update(Request $request ,$id){
        $validator = Validator::make($request->all(),
        [
            'status'=>'required',
        ]);
        if($validator->fails())
        {
            return response ()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $order= Order::find($id);
            if($order)
            {
                $order->status = $request->input('status');
                // $order->firstname = $request->input('firstname');
                // $order->lastname = $request->input('lastname');
                // $order->phone = $request->input('phone');
                // $order->zipcode = $request->input('zipcode');
                // $order->address = $request->input('address');
                // $order->city = $request->input('city');
                // $order->state=$request->input('state');
                // $order->payment_mode=$request->input('popular');
                // $order->status=$request->input('status');
                $order->update();

                return response ()->json([
                    'status'=>200,
                    'message'=>'Status Order Updated Successfully',
                ]);
            }
            else
            {
                return response ()->json([
                    'status'=>404,
                    'message'=>'Order not found!',
                ]);
            }
        }
    }
    public function userOrders()
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;

            $orders = Order::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'orders' => $orders,
            ]);
        }
        else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
}
