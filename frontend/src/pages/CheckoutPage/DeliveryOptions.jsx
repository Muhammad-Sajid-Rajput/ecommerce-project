import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";

function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        const updateDeliveryOptions = async () => {
          try {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id,
            });
          } catch (error) {
            console.error("Error updating delivery option:", error);
          }
          await loadCart();
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOptions}
          >
            <input
              type="radio"
              onChange={() => {}}
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              id={`delivery-option-${cartItem.productId}-${deliveryOption.id}`}
            />
            <label
              htmlFor={`delivery-option-${cartItem.productId}-${deliveryOption.id}`}
            >
              <div>
                <div className="delivery-option-date">
                  {dayjs()
                    .add(deliveryOption.estimatedDeliveryTimeMs, "millisecond")
                    .format("dddd, MMMM D")}
                </div>
                <div className="delivery-option-price">{priceString}</div>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}
export { DeliveryOptions };
