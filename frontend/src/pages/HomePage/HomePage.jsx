import "./HomePage.css";
import { Header } from "../../components/Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid.jsx";
function HomePage({ cart }) {
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

  const handleAddToCart = (productId, quantity) => {
    // TODO: Implement add to cart logic
    console.log("Add to cart", productId, quantity);
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
