<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderItemsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register-user', [UserController::class, 'registerUser']);
Route::post('/login-user', [UserController::class, 'loginUser']);

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    
    // Category
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('view-category', [CategoryController::class, 'view']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::post('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);

    //Order
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('admin/view-order/{id}', [OrderController::class, 'view']);
    Route::put('update-order/{id}', [OrderController::class, 'update']);

    //Product
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::get('view-product', [ProductController::class, 'view']);

    //User
    Route::post('store-user', [UserController::class,'store']);
    Route::get('view-user', [UserController::class, 'view']);

});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [UserController::class, 'logout']);

    //Category
    Route::get('getCategory', [FrontendController::class, 'category']);
    Route::post('fetchproducts/{slug}', [FrontendController::class, 'product']);
    // Route::post('fetchproducts/{slug}', [FrontendController::class, 'sortProduct']);

    //Product
    Route::get('viewproductdetail/{categoory_slug}/{product_slug}', [FrontendController::class, 'viewproduct_details']);
    // Route::get('all-product', [ProductController::class, 'allProduct']);
    // Route::post('/search', [FrontendController::class, 'search']);

    //Cart
    Route::post('add-to-cart', [CartController::class, 'addtocart']);
    Route::get('cart', [CartController::class, 'viewcart']);
    Route::put('cart-updateqty/{cart_id}/{scope}', [CartController::class, 'updateqty']);
    Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deletecartitem']);

    //Review
    Route::get('getAllReview/{product_id}', [ReviewController::class, 'allreview']);
    Route::post('store-review', [ReviewController::class, 'store']);
    Route::put('update-review/{review_id}', [ReviewController::class, 'update']);
    Route::delete('delete-review/{review_id}', [ReviewController::class, 'delete']);

    //Checkout
    Route::post("place-order" ,[CheckoutController::class, 'placeorder']);

    //User
    Route::get('getInfoUser', [UserController::class, 'info']);
    Route::put('personal-information/{user_id}', [UserController::class, 'update']);

    //Order
    Route::get('getOrders', [OrderController::class, 'userOrders']);

    //OrderItems
    Route::get('getOrderDetails/{orderID}', [OrderItemsController::class, 'orderDetails']);

    //Password
    Route::post('changePassword', [UserController::class, 'change_password']);
});

//Product
Route::get('all-product', [ProductController::class, 'allProduct']);
Route::post('/search', [FrontendController::class, 'search']);
Route::get('/products', [FrontendController::class, 'index']);
