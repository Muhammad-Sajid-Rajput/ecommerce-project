import axios from "axios";
import "./App.css";
import { HomePage } from "./pages/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage/checkout.jsx";
import { OrdersPage } from "./pages/orders.jsx";
import { TrackingPage } from "./pages/tracking.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
