import "./orders.css";
import { Header } from "../../components/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderGrid } from "./OrderGrid.jsx";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} />
      </div>
    </>
  );
}

export { OrdersPage };
