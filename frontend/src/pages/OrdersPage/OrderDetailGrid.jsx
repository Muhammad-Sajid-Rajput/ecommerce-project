import dayjs from "dayjs";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function OrderDetailsGrid({ order }) {
  const navigate = useNavigate();
  return (
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
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={() => console.log("Buy again", orderProduct.id)}
              >
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <button
                className="track-package-button button-secondary"
                onClick={() =>
                  navigate(`/tracking/${order.id}/${orderProduct.productId}`)
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
