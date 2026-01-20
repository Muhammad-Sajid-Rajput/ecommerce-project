import "./orders.css";
import { Header } from "../../components/Header.jsx";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { formatMoney } from "../../utils/money.jsx";

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

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
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
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct, index) => {
                    return (
                      <Fragment key={`${orderProduct.product.id}-${index}`}>
                        <div className="product-image-container">
                          <img
                            src={orderProduct.product.image}
                            alt={orderProduct.product.name || "Product image"}
                          />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button
                            className="buy-again-button button-primary"
                            onClick={() =>
                              console.log("Buy again", orderProduct.id)
                            }
                          >
                            <img
                              className="buy-again-icon"
                              src={BuyAgainIcon}
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <button
                            className="track-package-button button-secondary"
                            onClick={() =>
                              (window.location.href = `/tracking?orderId=${order.id}`)
                            }
                          >
                            Track package
                          </button>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { OrdersPage };
