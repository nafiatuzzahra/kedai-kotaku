import { useMemo, useState } from "react";
import Home from "./pages/Home";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  function addToCart(item) {
    setCart((current) => [...current, { ...item, id: crypto.randomUUID() }]);
  }

  function updateCartItem(id, changes) {
    setCart((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  }

  function removeCartItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return <Home cart={cart} cartCount={cartCount} customerName={customerName} onCustomerNameChange={setCustomerName} isCartOpen={isCartOpen} onOpenCart={() => setIsCartOpen(true)} onCloseCart={() => setIsCartOpen(false)} onUpdateCartItem={updateCartItem} onRemoveCartItem={removeCartItem} onAddToCart={addToCart} />;
}

export default App;
