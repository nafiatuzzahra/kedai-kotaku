import { useMemo, useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Developer from "./pages/Developer";
import { createOrder } from "./lib/orders";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
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

  async function checkout() {
    const order = await createOrder({ customerName, customerPhone, items: cart });
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    return order;
  }

  if (window.location.pathname === "/developer" || window.location.pathname.startsWith("/developer/")) return <Developer />;
  if (window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/")) return <Admin />;
  return <Home cart={cart} cartCount={cartCount} customerName={customerName} customerPhone={customerPhone} onCustomerNameChange={setCustomerName} onCustomerPhoneChange={setCustomerPhone} isCartOpen={isCartOpen} onOpenCart={() => setIsCartOpen(true)} onCloseCart={() => setIsCartOpen(false)} onUpdateCartItem={updateCartItem} onRemoveCartItem={removeCartItem} onAddToCart={addToCart} onCheckout={checkout} />;
}

export default App;
