import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import { useState } from "react";

function ProductsGrid({ products, onAddToCart }) {
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    if (onAddToCart) {
      onAddToCart(productId, quantity);
      setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    }
  };

  return (
    <div className="products-grid">
      {(products || []).map((product) => {
        return (
          <div key={product.id} className="product-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
                alt={product.name || "Product image"}
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {product.name}
            </div>

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

            <div className="product-price">
              {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
              <select
                value={quantities[product.id] || 1}
                onChange={(e) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [product.id]: Number(e.target.value),
                  }))
                }
              >
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

            {addedToCart[product.id] && (
              <div className="added-to-cart">
                <img src={CheckmarkIcon} alt="added" />
                Added
              </div>
            )}

            <button
              className="add-to-cart-button button-primary"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export { ProductsGrid };
