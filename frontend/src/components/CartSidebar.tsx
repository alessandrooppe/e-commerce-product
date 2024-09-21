import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart } from '../store/cartSlice';

const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={`fixed top-0 right-0 w-90 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Carrello</h2>
        {cart.items.length === 0 ? (<p>Il carrello è vuoto.</p>) : (
          <div>
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between mb-4 px-2">
                <img src={item.product.images[0]} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                <div className="ml-2 mr-2 flex-1">
                  <h3 className="text-lg truncate">{item.product.title}</h3>
                  <p className="text-sm">Prezzo: {item.product.price} €</p>
                  <p className="text-sm">Quantità: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mr-2"
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-semibold">
                Totale: {cart.total.toFixed(2)} €
              </p>
            </div>
          </div>
        )}
        <button onClick={onClose} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;