import "./HomePage.css";
import { Header } from "../../components/Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid.jsx";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    document.title = "Ecommerce Project";
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        {loading && <div style={{ padding: "20px", textAlign: "center" }}>Loading products...</div>}
        {error && (
          <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
            Error loading products. Please try again later.
          </div>
        )}
        {!loading && !error && <ProductsGrid products={products} loadCart={loadCart} />}
      </div>
    </>
  );
}

export { HomePage };
