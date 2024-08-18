import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext"; // Adjust the import path if necessary

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState(""); // State for cart message
  const { addItem } = useCart(); // Use the Cart context correctly

  useEffect(() => {
    // Fetching products from the FakeStore API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching the products:", error));
  }, []);

  const handleAddToCart = (product) => {
    addItem(product); // Use addItem instead of addToCart
    setCartMessage(`Added ${product.title} to cart!`);
    setTimeout(() => setCartMessage(""), 3000); // Clear the message after 3 seconds
  };

  return (
    <div className="flex flex-wrap justify-center items-start p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-md shadow-md border-slate-800 bg-slate-300 p-4"
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-cover transition-transform duration-300 transform hover:scale-110"
              />
            </div>

            <h2 className="font-medium text-lg truncate">{product.title}</h2>
            <h3 className="capitalize text-slate-500 mb-2">
              {product.category}
            </h3>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">${product.price}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded">
          {cartMessage}
        </div>
      )}
    </div>
  );
};

export default Product;
