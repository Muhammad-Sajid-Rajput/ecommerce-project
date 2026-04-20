import { DeliveryOptions } from "./DeliveryOptions.jsx";
import { CartItemDetails } from "./CartItemDetails.jsx";
import { DeliveryDate } from "./DeliveryDate.jsx";

function OrderSummary({ deliveryOptions, cart, loadCart }) {
  const isEmpty = !cart || cart.length === 0;

  return (
    <div className="order-summary">
      {isEmpty ? (
        <div className="empty-cart-message">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <a href="/" className="button-primary continue-shopping-button">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          {deliveryOptions.length > 0 &&
            cart.map((cartItem) => {
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <DeliveryDate
                    cartItem={cartItem}
                    deliveryOptions={deliveryOptions}
                  />
                  <div className="cart-item-details-grid">
                    <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                    <DeliveryOptions
                      deliveryOptions={deliveryOptions}
                      cartItem={cartItem}
                      loadCart={loadCart}
                    />
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
export { OrderSummary };
