<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
   public function index(Request $request)
    {
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        $cart->load('items.product');

        return Inertia::render('Cart/Index', [
            'cart' => $cart,
        ]);
    }

    public function add(Request $request)
    {
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

        $item = $cart->items()->where('product_id', $request->product_id)->first();

        if ($item) {
            $item->increment('quantity', $request->quantity ?? 1);
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
                'price' => $request->price ?? 1,
                'customizations' => $request->customizations ?? [],
            ]);
        }

        return back()->with('success', 'Product added to cart!');
    }

    public function remove(CartItem $cartItem)
    {
        $cartItem->delete();
        return back()->with('success', 'Item removed from cart.');
    }

    public function clear(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();
        $cart?->items()->delete();

        return back()->with('success', 'Cart cleared.');
    }

    public function addCustomShoe(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->firstOrCreate([]);

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'customizations' => 'nullable|array',
            'quantity' => 'nullable|integer|min:1',
            'price' => 'required'
        ]);

        $item = $cart->items()->create([
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'] ?? 1,
            'price' => $validated['price'] ?? 1,
            'customizations' => $validated['customizations'] ?? [],
        ]);

        return back()->with('success', 'Added');
    }
}
