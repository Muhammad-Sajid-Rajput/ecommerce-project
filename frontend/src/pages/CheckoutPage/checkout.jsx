import axios from "axios";
import { useState, useEffect } from "react";
import "./checkout.css";
import { CheckoutHeader } from "./checkout-header.jsx";
import { OrderSummary } from "./OrderSummary.jsx";
import { PaymentSummary } from "./PaymentSummary.jsx";

function CheckoutPage({ cart, setCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

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

  const handleDeliveryOptionChange = async (productId, deliveryOptionId) => {
    try {
      await axios.put(`/api/cart-items/${productId}`, {
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
    }
  };

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            handleDeliveryOptionChange={handleDeliveryOptionChange}
          />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export { CheckoutPage };
