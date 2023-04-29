<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('name');
            $table->string('slug');
            $table->mediumText('description')->nullable();
            $table->string('original_price');
            $table->string('selling_price');
            $table->string('quantity');
            $table->string('warranty');
            $table->string('image')->nullable();
            $table->tinyInteger('featured')->default('0')->nullable();
            $table->tinyInteger('popular')->default('0')->nullable();
            $table->tinyInteger('status')->default('0')->nullable();
            $table->timestamps();
        });
        Schema::create('carts', function(Blueprint $table){
            $table->id();
            $table->string('user_id');
            $table->integer('product_id');
            $table->integer('product_qty');
            $table->timestamps();
            
        })
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
