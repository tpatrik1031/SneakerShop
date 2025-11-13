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
        Schema::create('product_customizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('cart_item_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('order_item_id')->nullable()->constrained()->cascadeOnDelete();

            $table->string('lace_color')->default('#ffffff');
            $table->string('mesh_color')->default('#ffffff');
            $table->string('stripe_color')->default('#000000');
            $table->string('sole_color')->default('#ffffff');
            $table->string('patch_color')->default('#ffffff');
            $table->string('band_color')->default('#ffffff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_customizations');
    }
};
