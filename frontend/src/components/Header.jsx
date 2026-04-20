import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./Header.css";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import { useState } from "react";

function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search");

  let totalQuantity = 0;
  cart?.forEach((cartItems) => {
    totalQuantity += cartItems.quantity;
  });

  const [search, setSearch] = useState(searchQuery || "");

  const updateSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <span className="logo-text">Amazon clone</span>
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={updateSearchInput}
            onKeyDown={(e) => e.key === "Enter" && searchProducts()}
          />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} alt="Search" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} alt="Cart" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
export { Header };
