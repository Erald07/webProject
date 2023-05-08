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
        Schema::create('orders', function (Blueprint $table) {
           $table->id();
           $table->integer('user_id');
           $table->string('firstname');
           $table->string('lastname');
           $table->string('email');
           $table->string('phone');
           $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zipcode');
            $table->string('payment_id')->nullable();
            $table->string('payment_mode');
            $table->string('tracking_no');
            $table->tinyInteger('status')->default('0');
            $table->timestamps();
            $table->text('remark');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
