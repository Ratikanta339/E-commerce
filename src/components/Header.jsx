import React from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Logo w={90} h={50} />
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none pl-2"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div
            className="text-2xl relative cursor-pointer"
            onClick={handleCartClick}
          >
            <span>
              <FaShoppingCart />
            </span>
            {cart.length > 0 && (
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{cart.length}</p>
              </div>
            )}
          </div>
          <div>
            <button className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
