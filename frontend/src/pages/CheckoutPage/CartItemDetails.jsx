import { formatMoney } from "../../utils/money.jsx";
import axios from "axios";
function CartItemDetails({ cartItem , loadCart}) {
  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
    await loadCart();
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
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">Update</span>
          <span className="delete-quantity-link link-primary"
          onClick={deleteCartItem}
          >Delete</span>
        </div>
      </div>
    </>
  );
}

export { CartItemDetails };
