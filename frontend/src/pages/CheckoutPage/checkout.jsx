import axios from "axios";
import { useState, useEffect } from "react";
import "./checkout.css";
import { CheckoutHeader } from "./checkout-header.jsx";
import { OrderSummary } from "./OrderSummary.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

function CheckoutPage({ cart, setCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [updatingDelivery, setUpdatingDelivery] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliveryResponse = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime",
        );
        setDeliveryOptions(deliveryResponse.data);

        const paymentResponse = await axios.get("/api/payment-summary");
        setPaymentSummary(paymentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePlaceOrder = () => {
    // TODO: Implement order submission logic
    console.log("Placing order...");
  };

  const handleDeliveryOptionChange = async (cartItemId, deliveryOptionId) => {
    if (updatingDelivery) return;
    setUpdatingDelivery(true);
    try {
      await axios.put(`/api/cart-items/${cartItemId}`, {
        deliveryOptionId,
      });
      // Refetch cart to update the UI
      const cartResponse = await axios.get("/api/cart-items?expand=product");
      setCart(cartResponse.data);

      // Refetch payment summary to update shipping costs
      const paymentResponse = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    } catch (error) {
      console.error("Error updating delivery option:", error);
    } finally {
      setUpdatingDelivery(false);
    }
  };

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            handleDeliveryOptionChange={handleDeliveryOptionChange}
            updatingDelivery={updatingDelivery}
          />
          <PaymentSummary
            paymentSummary={paymentSummary}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </>
  );
}

export { CheckoutPage };
