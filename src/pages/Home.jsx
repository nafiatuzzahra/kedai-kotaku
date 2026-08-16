import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Menu from "../components/Menu/Menu";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Cart from "../components/Cart/Cart";

function Home({ cart, cartCount, customerName, customerPhone, onCustomerNameChange, onCustomerPhoneChange, isCartOpen, onOpenCart, onCloseCart, onUpdateCartItem, onRemoveCartItem, onAddToCart, onCheckout }) {
  return (
    <>
      <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />
      <main>
        <Hero />
        <About />
        <Menu onAddToCart={onAddToCart} />
        <Contact />
      </main>
      <Footer />
      <Cart items={cart} customerName={customerName} customerPhone={customerPhone} onCustomerNameChange={onCustomerNameChange} onCustomerPhoneChange={onCustomerPhoneChange} onCheckout={onCheckout} open={isCartOpen} onClose={onCloseCart} onUpdate={onUpdateCartItem} onRemove={onRemoveCartItem} />
    </>
  );
}

export default Home;
