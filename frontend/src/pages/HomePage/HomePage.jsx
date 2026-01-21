import "./HomePage.css";
import { Header } from "../../components/Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid.jsx";
function HomePage({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await axios.post("/api/cart-items", { productId, quantity });
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    document.title = "Ecommerce Project";
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} onAddToCart={handleAddToCart} />
      </div>
    </>
  );
}

export { HomePage };
