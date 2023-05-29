<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function allreview($product_id)
    {
        $reviews = Review::where('product_id', $product_id)->get();
        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
        ]);
    }
    public function store(Request $request)
    {
        if(auth('sanctum')->check()){

            $validator = Validator::make($request->all(), [
                'review_text' => 'required',
            ]);
    
            if($validator->fails()){
                return response()->json([
                    'status' => 400,
                    'errors' => $validator->messages(),
                ]);
            }
            else{
                $user_id = auth('sanctum')->user()->id;
                $product_id = $request->product_id;
                $review_text = $request->input('review_text');

                $review = new Review;
                $review->user_id = $user_id;
                $review->product_id = $product_id;
                $review->review_text = $review_text;
                $review->save();

                return response()->json([
                    'status'=> 200,
                    'message'=> 'Added Review',
                ]);
            }
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=> 'Login to Add a Review',
            ]);
        }
    }
    public function update(Request $request ,$review_id)
    {
        $validator = Validator::make($request->all(),
        [
            'review_text'=>'required',
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
            $user_id = auth('sanctum')->user()->id;
            $review = Review::where('id', $review_id)->where('user_id', $user_id)->first();
            if($review)
            {
                $review->review_text = $request->input('review_text');
                $review->update();

                return response ()->json([
                    'status'=>200,
                    'message'=>'Review updated Successfully',
                ]);
            }
            else
            {
                return response ()->json([
                    'status'=>404,
                    'message'=>'Review not found !',
                ]);
            }
        }
    }
    public function delete($review_id)
    {
        $review = Review::find($review_id);

        if($review){
            $review->delete();
            return response()->json([
                'status' => 200,
                'message' => "Review Deleted Successfully"
            ]);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No Review ID Found"
            ]);
        }
    }
}
