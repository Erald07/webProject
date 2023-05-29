<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FrontendController extends Controller
{
    public function category()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status'=> 200,
            'category'=> $category
        ]);
    }

    // public function product($slug)
    // {
    //     $category = Category::where('slug', $slug) -> where('status','0') ->get();

    //     if($category)
    //     {
    //         $product = Product::where('category_id', $category[0]['id'])->where('status', '0')->get();

    //         if($product)
    //         {
    //             return response()->json([
    //                 'status'=> 200,
    //                 'product_data'=>[
    //                     'product'=> $product,
    //                     'category'=> $category,
    //                 ]            
    //             ]);
    //         }
    //         else
    //         {
    //             return response()->json([
    //                 'status' =>400,
    //                 'message'=>'No products available'
    //             ]);        
    //         }
    //     }
    //     else
    //     {
    //         return response()->json([
    //             'status'=> 404,
    //             'message'=>'No Such Category Found'
    //         ]);
    //     }
    // }
    public function product(Request $request, $slug)
    {
        $category = Category::where('slug', $slug) -> where('status','0') ->get();

        if($category)
        {
            $query = Product::query();

            if($request->has('orderBy') && $request->has('minPrice')){
                if($request->input('orderBy') != null && $request->input('minPrice') != null){
                    $orderBy = $request->input('orderBy');
                    $minPrice = $request->input('minPrice');
                    $maxPrice = $request->input('maxPrice');
                    if($orderBy == 'default'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                    }
                    if($orderBy == 'latest'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('created_at', 'desc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                    }
                    if($orderBy == 'price-low-to-high'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('selling_price', 'asc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                    }
                    if($orderBy == 'price-high-to-low'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('selling_price', 'desc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                    }
                    $products = $query->get();
    
                    if($products){
                        return response()->json([
                            'status' => 200,
                            'product_data'=>[
                                'product'=> $products,
                                'category'=> $category,
                            ] 
                        ]);
                    }
                    else{
                        return response()->json([
                            'status' => 400,
                            'message' => "No Products"
                        ]);
                    }
                }
                else if($request->input('orderBy') != null && $request->input('minPrice') == null){
                    $orderBy = $request->input('orderBy');
                    if($orderBy == 'default'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->get();
                    }
                    if($orderBy == 'latest'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('created_at', 'desc')->get();
                    }
                    if($orderBy == 'price-low-to-high'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('selling_price', 'asc')->get();
                    }
                    if($orderBy == 'price-high-to-low'){
                        $query->where('category_id', $category[0]['id'])->where('status', '0')->orderBy('selling_price', 'desc')->get();
                    }
                    $products = $query->get();
    
                    if($products){
                        return response()->json([
                            'status' => 200,
                            'product_data'=>[
                                'product'=> $products,
                                'category'=> $category,
                            ] 
                        ]);
                    }
                    else{
                        return response()->json([
                            'status' => 400,
                            'message' => "No Products"
                        ]);
                    }
                }
                else if($request->input('orderBy') == null && $request->input('minPrice') != null){
                    $minPrice = $request->input('minPrice');
                    $maxPrice = $request->input('maxPrice');
    
                    $query->where('category_id', $category[0]['id'])->where('status', '0')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                    
                    $products = $query->get();
    
                    if($products){
                        return response()->json([
                            'status' => 200,
                            'product_data'=>[
                                'product'=> $products,
                                'category'=> $category,
                            ] 
                        ]);
                    }
                    else{
                        return response()->json([
                            'status' => 400,
                            'message' => "No Products"
                        ]);
                    }
                }
                else{
                    $query->where('category_id', $category[0]['id'])->get();
                    $products = $query->get();
    
                    return response()->json([
                        'status' => 200,
                        'product_data'=>[
                            'product'=> $products,
                            'category'=> $category,
                        ] 
                    ]);
                }
            }
            else{
                $products = Product::where('category_id', $category[0]['id'])->where('status', '0')->get();

                return response()->json([
                    'status' => 200,
                    'product_data'=>[
                        'product'=> $products,
                        'category'=> $category,
                    ]  
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message'=>'No Such Category Found'
            ]);
        }
    }
    public function viewproduct_details($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug) ->where('status','0')->first();

        if($category)
        {
            $product = Product::where('category_id', $category['id'])->where('slug', $product_slug)->where('status', '0')->first();

            if($product)
            {
                return response()->json([
                    'status'=> 200,
                    'product'=> $product,
                ]);
            }
            else
            {
                return response()->json([
                    'status' =>400,
                    'message'=>'No products available'
                ]);        
            }
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message'=>'No Such Category Found'
            ]);
        }
    }
    public function search(Request $request)
    {
        $searchText = $request->input('searchText');

        $query = Product::query();

        if($request->has('orderBy') && $request->has('minPrice')){
            if($request->input('orderBy') != null && $request->input('minPrice') != null){
                $orderBy = $request->input('orderBy');
                $minPrice = $request->input('minPrice');
                $maxPrice = $request->input('maxPrice');
                if($orderBy == 'default'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                }
                if($orderBy == 'latest'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('created_at', 'desc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                }
                if($orderBy == 'price-low-to-high'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('selling_price', 'asc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                }
                if($orderBy == 'price-high-to-low'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('selling_price', 'desc')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                }
                $products = $query->get();

                if($products){
                    return response()->json([
                        'status' => 200,
                        'products' => $products
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 400,
                        'message' => "No Products"
                    ]);
                }
            }
            else if($request->input('orderBy') != null && $request->input('minPrice') == null){
                $orderBy = $request->input('orderBy');
                if($orderBy == 'default'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->get();
                }
                if($orderBy == 'latest'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('created_at', 'desc')->get();
                }
                if($orderBy == 'price-low-to-high'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('selling_price', 'asc')->get();
                }
                if($orderBy == 'price-high-to-low'){
                    $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->orderBy('selling_price', 'desc')->get();
                }
                $products = $query->get();

                if($products){
                    return response()->json([
                        'status' => 200,
                        'products' => $products
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 400,
                        'message' => "No Products"
                    ]);
                }
            }
            else if($request->input('orderBy') == null && $request->input('minPrice') != null){
                $minPrice = $request->input('minPrice');
                $maxPrice = $request->input('maxPrice');

                $query->where('name', 'like', '%' . $searchText . '%')->where('status', '0')->where('selling_price', '>=', $minPrice)->where('selling_price', '<=', $maxPrice)->get();
                
                $products = $query->get();

                if($products){
                    return response()->json([
                        'status' => 200,
                        'products' => $products,
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 400,
                        'message' => "No Products"
                    ]);
                }
            }
            else{
                $query->where('name', 'like', '%' . $searchText . '%')->get();
                $products = $query->get();

                return response()->json([
                    'status' => 200,
                    'products' => $products,
                ]);
            }
        }
        else{ 
            $query->where('name', 'like', '%' . $searchText . '%')->get();
            $products = $query->get();

            return response()->json([
                'status' => 200,
                'products' => $products,
                'kot' => "kot",
            ]);
        }
    }
    public function index(Request $request)
    {
        return Product::filter($request)->get();
    }
}
