import { formatMoney } from "../../utils/money.jsx";
import dayjs from "dayjs";

function OrderHeader({ order }) {
  // Calculate order status
  const now = dayjs().valueOf();
  const isDelivered = order.products?.every(
    (product) => product.estimatedDeliveryTimeMs <= now,
  );

  // Calculate progress percentage for the most delayed product
  const getOrderStatus = () => {
    if (!order.products || order.products.length === 0) {
      return { label: "Processing", className: "status-processing" };
    }

    if (isDelivered) {
      return { label: "Delivered", className: "status-delivered" };
    }

    // Find the product with the latest delivery date (most delayed)
    const maxDeliveryTime = Math.max(
      ...order.products.map((p) => p.estimatedDeliveryTimeMs),
    );
    const orderTime = order.orderTimeMs;
    const totalDeliveryTime = maxDeliveryTime - orderTime;
    const timePassed = now - orderTime;

    if (totalDeliveryTime <= 0) {
      return { label: "Processing", className: "status-processing" };
    }

    const deliveryPercent = (timePassed / totalDeliveryTime) * 100;

    if (deliveryPercent < 33) {
      return { label: "Received", className: "status-received" };
    } else if (deliveryPercent < 66) {
      return { label: "In Kitchen", className: "status-in-kitchen" };
    } else {
      return { label: "Sent to Delivery", className: "status-sent" };
    }
  };

  const status = getOrderStatus();

  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
        </div>
        <div className="order-total">
          <div className="order-header-label">Total:</div>
          <div>{formatMoney(order.totalCostCents)}</div>
        </div>
        <div className="order-status">
          <div className="order-header-label">Status:</div>
          <div className={`status-badge ${status.className}`}>
            {status.label}
          </div>
        </div>
      </div>

      <div className="order-header-right-section">
        <div className="order-header-label">Order ID:</div>
        <div>{order.id}</div>
      </div>
    </div>
  );
}

export { OrderHeader };
