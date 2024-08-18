import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartDetails from "./pages/CartPage";
import { CartProvider } from "./components/CartContext";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/cart" Component={CartPage} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
