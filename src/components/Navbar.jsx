import { Link, useLocation } from "react-router-dom";
import favIcon from "../assets/favIcon.svg";
import imgCart from "../assets/imgCart.svg";
import Searchbar from "./Searchbar";
import { useCart } from '../context/CartContext';  // Import the useCart hook

import styles from "../styles/Navbar.module.css";

export default function Navbar({ onSearch }) {
  const location = useLocation();
  const onShopPage = location.pathname;
  const { cartItems } = useCart(); // Destructure cartItems from context
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">
              <img src={favIcon} alt="Cute frog head icon." />
            </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/shopping-cart">
              <div className={styles.cartItemsContainer}>
                <img src={imgCart} alt="Shopping cart icon." />
                {totalItems > 0 && (
                  <div className={styles.cartItemsNum}>{totalItems}</div>
                )}
              </div>
            </Link>
          </li>
        </ul>
        {onShopPage === "/shop" && <Searchbar onSearch={onSearch} />}
      </nav>
    </>
  );
}
