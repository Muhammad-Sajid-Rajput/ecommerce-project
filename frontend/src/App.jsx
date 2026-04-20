import axios from "axios";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage/checkout.jsx";
import { OrdersPage } from "./pages/OrdersPage/orders.jsx";
import { TrackingPage } from "./pages/TrackingPage/TrackingPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.jsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage/ProductDetailsPage.jsx";
import { Footer } from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route
          path="/product/:productId"
          element={<ProductDetailsPage cart={cart} loadCart={loadCart} />}
        />
        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
