import { DeliveryOptions } from "./DeliveryOptions.jsx";
import { CartItemDetails } from "./CartItemDetails.jsx";
import { DeliveryDate } from "./DeliveryDate.jsx";

function OrderSummary({
  deliveryOptions,
  cart,
  handleDeliveryOptionChange,
  updatingDelivery,
}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  handleDeliveryOptionChange={handleDeliveryOptionChange}
                  disabled={updatingDelivery}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
export { OrderSummary };
