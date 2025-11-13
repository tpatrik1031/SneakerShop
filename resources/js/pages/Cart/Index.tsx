import { Head, useForm } from '@inertiajs/react';
import { Cart } from '@/types';
import React from 'react';

interface Props {
  cart: Cart;
}

export default function CartPage({ cart }: Props) {
  const { delete: destroy, post } = useForm();

  const removeItem = (id: number) => {
    destroy(route('cart.remove', id));
  };

  const clearCart = () => {
    destroy(route('cart.clear'));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Head title="Your Cart" />

      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
