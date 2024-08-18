import React from "react";
import { useCart } from "../components/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeItem, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleQuantityChange = (itemId, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateQuantity(itemId, quantity);
    }
  };

  const handleQuantityIncrease = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      updateQuantity(itemId, (item.quantity || 1) + 1);
    }
  };

  const handleQuantityDecrease = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item && (item.quantity || 1) > 1) {
      updateQuantity(itemId, (item.quantity || 1) - 1);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h2>
                  <p className="text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityDecrease(item.id)}
                      className="bg-gray-200 text-gray-600 font-bold py-1 px-2 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(event) => handleQuantityChange(item.id, event)}
                      className="w-16 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => handleQuantityIncrease(item.id)}
                      className="bg-gray-200 text-gray-600 font-bold py-1 px-2 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-700">
                <span>Estimated Tax (10%)</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${(subtotal * 1.1).toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
