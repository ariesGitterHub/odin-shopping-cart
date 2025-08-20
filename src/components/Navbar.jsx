import { Link, useLocation } from "react-router-dom";
import favIcon from "../assets/favIcon.svg";
import imgCart from "../assets/imgCart.svg";
import Searchbar from "./Searchbar";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ onSearch }) {
  const location = useLocation();
  const onShopPage = location.pathname;
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
              <img src={imgCart} alt="Shopping cart icon." />
            </Link>
          </li>
        </ul>
        {onShopPage === "/shop" && <Searchbar onSearch={onSearch} />}
      </nav>
    </>
  );
}
