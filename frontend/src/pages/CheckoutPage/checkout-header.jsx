import './checkout-header.css';
import { Link } from 'react-router-dom';
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

function CheckoutHeader({ cart }) {
  const totalQuantity = (cart ?? []).reduce((total, cartItem) => {
    return total + (cartItem.quantity || 0);
  }, 0);
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/" className="checkout-header-link">
            <span className="logo-text">Amazon clone</span>
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalQuantity} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} alt="Secure checkout" />
        </div>
      </div>
    </div>
  );
}

export { CheckoutHeader };