import "./tracking.css";
import { Header } from "../components/Header.jsx";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchTrackingInfo();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products?.find((orderProduct) => {
    return orderProduct.productId === productId;
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

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
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
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
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
