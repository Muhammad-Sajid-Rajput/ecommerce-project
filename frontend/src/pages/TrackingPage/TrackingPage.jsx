import "./TrackingPage.css";
import { Header } from "../../components/Header.jsx";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get(
          `/api/orders/${orderId}?expand=products`,
        );
        setOrder(response.data);
      } catch (err) {
        setError(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingInfo();
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <div className="product-info">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>
            <div className="product-info">
              Error loading tracking information. Please try again later.
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!order) {
    return null;
  }

  const orderProduct = order.products?.find((orderProduct) => {
    return orderProduct.product.id === productId;
  });

  if (!orderProduct) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>
            <div className="product-info">Product not found in this order.</div>
          </div>
        </div>
      </>
    );
  }

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent;
  if (totalDeliveryTimeMs <= 0) {
    deliveryPercent = timePassedMs >= 0 ? 100 : 0;
  } else {
    deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    deliveryPercent = Math.max(0, Math.min(100, deliveryPercent));
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Track Orders</title>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
            alt="Product image"
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing ? "current-status" : ""}`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${isShipped ? "current-status" : ""}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered ? "current-status" : ""}`}
            >
              Delivered
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export { TrackingPage };
