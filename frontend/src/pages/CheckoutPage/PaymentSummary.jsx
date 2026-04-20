import { formatMoney } from "../../utils/money.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentSummary({ paymentSummary, loadCart, cart }) {
  const navigate = useNavigate();
  const isEmpty = !cart || cart.length === 0;

  const onPlaceOrder = async () => {
    if (isEmpty) return;
    try {
      await axios.post("/api/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      return;
    }
    await loadCart();
    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && !isEmpty && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={onPlaceOrder}
            type="button"
            disabled={isEmpty}
          >
            Place your order
          </button>
        </>
      )}

      {isEmpty && (
        <div className="empty-payment-message">
          <p>Add items to your cart to see the payment summary.</p>
        </div>
      )}
    </div>
  );
}
export { PaymentSummary };
