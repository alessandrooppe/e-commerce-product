import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { useState } from 'react';


export default function App() {
  
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>

      <div>
        <button onClick={toggleCart} className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded">
          Carrello
        </button>
        <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      </div>
    </div>   
  );
}
