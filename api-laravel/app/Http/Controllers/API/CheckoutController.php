<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $_request){

        if(auth('sanctum')->check()){ 

            $validator = Validator::make($_request->all(),[
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',

            ]);
            if($validator->fails())
            {
                return response()->json([
                        'status' => 422,
                        'errors' => $validator ->messages()
                ]);
            }
            else{

                $order = new Order;
                $user_id = auth('sanctum')->user()->id;
                $order->user_id = $user_id;
                $order->email = $_request->email;
                $order->firstname = $_request->firstname;
                $order->lastname = $_request->lastname;
                $order->phone = $_request->phone;
                $order->zipcode = $_request->zipcode;
                $order->address = $_request->address;
                $order->city = $_request->city;
                $order->state = $_request->state;
                $order->payment_mode = "COD";
                $order->tracking_no = "electroniccom".rand(1111,9999);
                $order->save();

                $cart =  Cart::where('user_id', $user_id)->get();

                $orderitems = [];
                foreach($cart as $item){
                    $orderitems[] =[
                        'product_id' =>$item->product_id,
                        'qty' =>$item->product_qty,
                        'price' =>$item->product->selling_price * $item->product_qty,

                    ];
                    $item->product->update([
                        'quantity' =>$item->product->quantity - $item->product_qty
                    ]);
                }
                $order->orderitems()->createMany($orderitems);
                Cart::destroy($cart);

                return response()->json([
                    'status'=>200,
                    'message'=>'Order Placed Successfully',
                ]);
            }
        }
        else{
            return response()->json([
                'status'=> 401,
                'message'=>'Login to Continue',
            ]);
        }
    }
}
