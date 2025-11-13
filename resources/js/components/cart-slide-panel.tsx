import { useForm } from '@inertiajs/react';
import { Cart } from '@/types';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  cart: Cart | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSlidePanel({ cart, isOpen, onClose }: Props) {
  const { delete: destroy } = useForm();

  // Zárd be az ESC gombbal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const removeItem = (id: number) => {
    destroy(route('cart.remove', id), {
      preserveScroll: true,
    });
  };

  const clearCart = () => {
    if (confirm('Biztosan törölni szeretnéd az összes terméket a kosárból?')) {
      destroy(route('cart.clear'), {
        preserveScroll: true,
      });
    }
  };

  const total = cart?.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0) || 0;

  return (
    <>
      {/* Háttér overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Fejléc */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Kosár</h2>
              {cart && cart.items.length > 0 && (
                <span className="bg-black text-white text-xs rounded-full px-2 py-1">
                  {cart.items.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tartalom */}
          <div className="flex-1 overflow-y-auto p-4">
            {!cart || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="w-16 h-16 mb-4" />
                <p className="text-lg">A kosarad üres</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Mennyiség: {item.quantity}
                      </p>
                      <p className="text-sm font-bold mt-2">
                        {(item.price * item.quantity).toLocaleString()} Ft
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors self-start"
                      title="Eltávolítás"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lábléc */}
          {cart && cart.items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Összesen:</span>
                <span>{total.toLocaleString()} Ft</span>
              </div>

              <button
                onClick={() => alert('Fizetés folyamatban...')}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Fizetés
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                Kosár ürítése
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
