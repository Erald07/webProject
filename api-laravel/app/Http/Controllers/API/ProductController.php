<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function view(){
        $products = Product::all();
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }
    public function allProduct(){
        $products = Product::where('status', 0)->get();
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }

    public function store(Request $request)
    {   
        $validator = Validator::make($request->all(),
        [
            'category_id'=>'required|max:191',
            'name'=>'required|max:191',
            'slug'=>'required|max:191',
            'original_price'=>'required|regex:/^\d+(\.\d{1,2})?$/',
            'selling_price'=>'required|regex:/^\d+(\.\d{1,2})?$/',
            'quantity'=>'required|integer',
            'warranty'=>'required|integer',
            'photo'=>'required|image|max:2048',
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
            $product= new Product;
            $product->category_id=$request->input('category_id');
            $product->name=$request->input('name');
            $product->slug=$request->input('slug');
            $product->description=$request->input('description');
            $product->original_price=$request->input('original_price');
            $product->selling_price=$request->input('selling_price');
            $product->quantity=$request->input('quantity');
            $product->warranty=$request->input('warranty');

            if($request->hasFile('photo'))
            {   
                $file=$request->file('photo');
                $extension =$file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $product->photo= 'uploads/product/'.$filename;
            }

            $product->featured=$request->input('featured') == true ? '1':'0';
            $product->popular=$request->input('popular') == true ? '1':'0';
            $product->status=$request->input('status')== true ? '1':'0';
            $product->save();

            return response ()->json([
                'status'=>200,
                'message'=>'Product added Successfully',
                'product' => $product
            ]);
        }
    }
    public function edit($id)
    {
        $product = Product::find($id);
        if($product)
        {
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No product found',
            ]);
        }
    }

    public function update(Request $request ,$id){
        $validator = Validator::make($request->all(),
        [
            'category_id'=>'required|max:191',
            'name'=>'required|max:191',
            'slug'=>'required|max:191',
            'original_price'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'quantity'=>'required|max:4',
            'warranty'=>'required|max:4',
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
            $product= Product::find($id);
            if($product)
            {
                $product->category_id = $request->input('category_id');
                $product->name = $request->input('name');
                $product->slug = $request->input('slug');
                $product->description = $request->input('description');
                $product->original_price = $request->input('original_price');
                $product->selling_price = $request->input('selling_price');
                $product->quantity = $request->input('quantity');
                $product->warranty = $request->input('warranty');

                if($request->hasFile('photo'))
                {
                    $path = $product->photo;
                    if(File::exists($path))
                    {
                       File::delete($path);
                    }
                    $file=$request->file('photo');
                    $extension =$file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file->move('uploads/product/',$filename);
                    $product->photo= 'uploads/product/'.$filename;
                }

                $product->featured=$request->input('featured');
                $product->popular=$request->input('popular');
                $product->status=$request->input('status');
                $product->update();

                return response ()->json([
                    'status'=>200,
                    'message'=>'Product updated Successfully',
                ]);
            }
            else
            {
                return response ()->json([
                    'status'=>404,
                    'message'=>'Product not found!',
                ]);
            }
        }
    }
}
