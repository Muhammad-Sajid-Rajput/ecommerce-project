import "./orders.css";
import { Header } from "../../components/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderGrid } from "./OrderGrid.jsx";
import dayjs from "dayjs";

function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to check if an order is delivered
  const isOrderDelivered = (order) => {
    if (!order.products || order.products.length === 0) return false;
    const now = dayjs().valueOf();
    // Order is delivered if ALL products have passed their estimated delivery time
    return order.products.every(
      (product) => product.estimatedDeliveryTimeMs <= now,
    );
  };

  // Filter orders into current and previous
  const currentOrders = orders.filter((order) => !isOrderDelivered(order));
  const previousOrders = orders.filter((order) => isOrderDelivered(order));

  const isEmpty = !loading && !error && orders.length === 0;

  return (
    <>
      <title>Your Orders - Ecommerce Project</title>
      <meta
        name="description"
        content="View your order history and track packages."
      />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {loading && (
          <div className="orders-loading">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        )}

        {error && (
          <div className="orders-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button
              className="button-primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <a href="/" className="button-primary start-shopping-button">
              Start Shopping
            </a>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <>
            {/* Current Orders Section */}
            <div className="orders-section">
              <h2 className="orders-section-title">Current Orders</h2>
              {currentOrders.length > 0 ? (
                <OrderGrid orders={currentOrders} loadCart={loadCart} />
              ) : (
                <div className="orders-section-empty">
                  <p>No current orders</p>
                </div>
              )}
            </div>

            {/* Previous Orders Section */}
            <div className="orders-section">
              <h2 className="orders-section-title">Previous Orders</h2>
              {previousOrders.length > 0 ? (
                <OrderGrid orders={previousOrders} loadCart={loadCart} />
              ) : (
                <div className="orders-section-empty">
                  <p>No previous orders</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { OrdersPage };
