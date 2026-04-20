import { formatMoney } from "../../utils/money.jsx";
import axios from "axios";
import { useState } from "react";
function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      axios
        .put(`/api/cart-items/${cartItem.productId}`, {
          quantity: quantity,
        })
        .catch((error) => {
          console.error("Error updating cart item quantity:", error);
        });

      await loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = async (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
  };
  const handleQuantityKeyDown = async (event) => {
    if (event.key === "Enter") {
      await updateQuantity();
    } else if (event.key === "Escape") {
      setIsUpdatingQuantity(false);
      setQuantity(cartItem.quantity);
    }
  };

  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
        alt={cartItem.product.name || "Product image"}
      />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input
                type="number"
                className="quantity-textbox"
                defaultValue={cartItem.quantity}
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleQuantityKeyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export { CartItemDetails };
