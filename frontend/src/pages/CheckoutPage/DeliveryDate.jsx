import dayjs from "dayjs";
function DeliveryDate({ cartItem, deliveryOptions }) {
  const selectedDeliveryOptions = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {selectedDeliveryOptions
        ? dayjs()
            .add(selectedDeliveryOptions.estimatedDeliveryTimeMs, "millisecond")
            .format("dddd, MMMM D")
        : "Calculating..."}
    </div>
  );
}
export { DeliveryDate };
