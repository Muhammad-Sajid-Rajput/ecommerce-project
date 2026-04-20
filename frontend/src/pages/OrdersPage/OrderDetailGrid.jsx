import dayjs from "dayjs";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderDetailsGrid({ order, loadCart }) {
  const navigate = useNavigate();
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct, index) => {
        const handleAddToCart = async () => {
          try {
            await axios.post("/api/cart-items", {
              productId: orderProduct.product.id,
              quantity: 1,
            });
            await loadCart();
          } catch (error) {
            console.error("Error adding product to cart:", error);
          }
        };
        return (
          <Fragment key={`${orderProduct.product.id}-${index}`}>
            <div className="product-image-container">
              <img
                src={orderProduct.product.image}
                alt={orderProduct.product.name || "Product image"}
              />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-accent"
                onClick={handleAddToCart}
              >
                <img className="buy-again-icon" src={BuyAgainIcon} alt="" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <button
                className="track-package-button button-secondary"
                onClick={() =>
                  navigate(`/tracking/${order.id}/${orderProduct.product.id}`)
                }
              >
                Track package
              </button>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
export { OrderDetailsGrid };
