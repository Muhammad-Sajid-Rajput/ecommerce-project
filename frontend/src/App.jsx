import axios from "axios";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage/checkout.jsx";
import { OrdersPage } from "./pages/OrdersPage/orders.jsx";
import { TrackingPage } from "./pages/tracking.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} setCart={setCart} />} />
      <Route
        path="/checkout"
        element={<CheckoutPage cart={cart} setCart={setCart} />}
      />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
