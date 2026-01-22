import { Product } from "./Product.jsx";

function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {(products || []).map((product, index) => {
        if (!product) return null;
        return <Product key={product.id || index} product={product} loadCart={loadCart} />;
      })}
    </div>
  );
}

export { ProductsGrid };
