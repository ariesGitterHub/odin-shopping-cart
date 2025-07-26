import { Link } from "react-router-dom";
import favIcon from "../assets/favIcon.svg";
import imgCart from "../assets/imgCart.svg";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
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
          <img src={imgCart} alt="Shopping cart icon." />
        </li>
      </ul>
    </nav>
  );
}
