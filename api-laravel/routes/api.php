<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CartController;
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
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);

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
    // Route::post('store-category', [CategoryController::class, 'store']);
    // Route::get('view-category', [CategoryController::class, 'view']);
    // Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    // Route::put('update-category/{id}', [CategoryController::class, 'update']);
    // Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    // Route::get('all-category', [CategoryController::class, 'allcategory']);
    Route::post('add-to-card', [CartController::class, 'addtocart']);
    Route::get('cart', [CartController::class, 'viewcart']);

    //Category
    Route::get('getCategory', [FrontendController::class, 'category']);
    Route::get('fetchproducts/{slug}', [FrontendController::class, 'product']);

    //Product
    Route::get('viewproductdetail/{categoory_slug}/{product_slug}', [FrontendController::class, 'viewproduct']);

});