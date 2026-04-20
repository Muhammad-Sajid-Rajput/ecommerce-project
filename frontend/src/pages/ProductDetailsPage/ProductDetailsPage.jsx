import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../components/Header.jsx";
import { formatMoney } from "../../utils/money.jsx";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import "./ProductDetailsPage.css";

function ProductDetailsPage({ cart, loadCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/products`);
        const foundProduct = response.data.find((p) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          document.title = `${foundProduct.name} - Ecommerce Project`;
        } else {
          setError("Product not found");
          document.title = "Product Not Found - Ecommerce Project";
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || !product.id) {
      console.error("Cannot add to cart: product or product.id is missing");
      return;
    }
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity: quantity,
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
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);
  };

  if (loading) {
    return (
      <>
        <Header cart={cart} />
        <div className="product-details-page">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cart={cart} />
        <div className="product-details-page">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>{error}</h2>
            <button className="button-primary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Header cart={cart} />
      <div className="product-details-page">
        <div className="product-details-container">
          <div className="product-image-section">
            <img
              className="product-details-image"
              src={product.image}
              alt={product.name}
              loading="eager"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-details-name">{product.name}</h1>

            {product.rating && (
              <div className="product-details-rating">
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  alt={`Rating: ${product.rating.stars} out of 5`}
                />
                <span className="product-rating-count">
                  {product.rating.count} ratings
                </span>
              </div>
            )}

            <div className="product-details-price">
              {formatMoney(product.priceCents)}
            </div>

            <div className="product-details-divider"></div>

            <div className="product-details-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {addedToCart && (
              <div className="added-to-cart-message">
                <img src={CheckmarkIcon} alt="added" />
                <span>Added to cart!</span>
              </div>
            )}

            <button
              className="add-to-cart-button button-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="buy-now-button button-secondary"
              onClick={async () => {
                await handleAddToCart();
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>

            <div className="product-details-divider"></div>

            <div className="product-details-features">
              <h3>Product Features</h3>
              <ul>
                {product.keywords?.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ProductDetailsPage };
