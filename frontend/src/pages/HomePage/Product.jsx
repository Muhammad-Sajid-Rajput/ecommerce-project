import axios from "axios";
import { formatMoney } from "../../utils/money.jsx";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import { useState, useEffect } from "react";

function Product({ product, loadCart }) {
  const [quantities, setQuantities] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!product || !product.id) {
      console.error("Cannot add to cart: product or product.id is missing");
      return;
    }
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity: quantities,
      });
      await loadCart();
      setAddedToCart(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleQuantityChange = (e) => {
    const selectedQuantities = Number(e.target.value);
    setQuantities(selectedQuantities);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image || ""}
          alt={product.name || "Product image"}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name || ""}</div>

      {product.rating && (
        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
            alt={`Rating: ${product.rating.stars} out of 5`}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>
      )}

      <div className="product-price">{formatMoney(product.priceCents || 0)}</div>

      <div className="product-quantity-container">
        <select value={quantities} onChange={handleQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      {addedToCart && (
        <div className="added-to-cart" style={{ opacity: 1 }}>
          <img src={CheckmarkIcon} alt="added" />
          Added
        </div>
      )}

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
export { Product };
