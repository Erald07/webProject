<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function view()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    public function allcategory()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    public function edit($id)
    {
        $category = Category::find($id);
        if($category){
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        }
        else{
            return response()->json([
                'status' => 404,
                'category' => "No Category ID Found",
            ]);
        }
    }
    public function store(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:191',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }
        else{
            $category = new Category;

            $category->name = $request->input('name');
            $category->slug = $request->input('slug');
            $category->description = $request->input('description');
            $category->status = $request->input('status') == true ? '1' : '0';

            $category->save();
            return response()->json([
                'status' => 200,
                'message' => "Category Added Successfull"
            ]);
        }
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:191',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else{
            $category = Category::find($id);

            if($category){

                $category->name = $request->input('name');
                $category->slug = $request->input('slug');
                $category->description = $request->input('description');
                $category->status = $request->input('status') == true ? '0' : '1';

                $category->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Category Updated Successfull"
                ]);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => "No Category ID Found"
                ]);
            }
        }
    }
    public function destroy($id)
    {
        $category = Category::find($id);

        if($category){
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => "Category Deleted Successfully"
            ]);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => "No Category ID Found"
            ]);
        }
    }
}
