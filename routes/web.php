<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\Settings\LanguageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::group(['prefix' => 'settings'], function () {
        Route::get('language', [LanguageController::class, 'edit'])->name('language.edit');
        Route::put('language', [LanguageController::class, 'update'])->name('language.update');
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::resource('users', UserController::class)->names('users');
    });

    //Cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/add-custom-shoe', [CartController::class, 'addCustomShoe'])->name('cart.addCustomShoe');
    Route::delete('/cart/{cartItem}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart', [CartController::class, 'clear'])->name('cart.clear');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
