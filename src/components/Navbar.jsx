import { useCart } from "../context/useCart"; // Context imports should be first
import { Link, useLocation } from "react-router-dom"; // React-router imports second
import Searchbar from "./Searchbar"; // Component imports follow
import favIcon from "../assets/favIcon.svg"; // Asset imports come last
import imgCart from "../assets/imgCart.svg";

import styles from "../styles/Navbar.module.css";

export default function Navbar({ onSearch }) {
  const location = useLocation();
  const onShopPage = location.pathname;
  const { cartItems } = useCart(); // Destructure cartItems from context
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle keyboard navigation (Enter or Space)
  const handleKeyDown = (e, to) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevents default behavior of scrolling
      window.location.href = to; // Simulates clicking the link
    }
  };

  // return (
  //   <>
  //     <nav className={styles.navbar}>
  //       <ul>
  //         <li>
  //           <Link to="/">
  //             <img
  //               src={favIcon}
  //               alt="Cute frog head icon."
  //               tabIndex="0" // Makes the icon focusable
  //             />
  //           </Link>
  //         </li>
  //         <li>
  //           <Link to="/shop">Shop</Link>
  //         </li>
  //         <li>
  //           <Link to="/about">About</Link>
  //         </li>
  //         <li>
  //           <Link to="/contact">Contact</Link>
  //         </li>
  //         <li>
  //           <Link to="/shopping-cart">
  //             <div className={styles.cartItemsContainer}>
  //               <img
  //                 src={imgCart}
  //                 alt="Shopping cart icon."
  //                 tabIndex="0" // Makes the icon focusable
  //               />
  //               {totalItems > 0 && (
  //                 <div className={styles.cartItemsNum}>{totalItems}</div>
  //               )}
  //             </div>
  //           </Link>
  //         </li>
  //       </ul>
  //       {onShopPage === "/shop" && <Searchbar onSearch={onSearch} />}
  //     </nav>
  //   </>
  // );

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link
            to="/"
            aria-label="Home"
            onKeyDown={(e) => handleKeyDown(e, "/")}
          >
            <img
              src={favIcon}
              alt="Cute frog head icon."
              className={styles.favIcon}
              tabIndex="0" // Makes the icon focusable
            />
          </Link>
        </li>
        <li>
          <Link to="/shop" onKeyDown={(e) => handleKeyDown(e, "/shop")}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about" onKeyDown={(e) => handleKeyDown(e, "/about")}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onKeyDown={(e) => handleKeyDown(e, "/contact")}>
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/shopping-cart"
            aria-label="Shopping cart"
            onKeyDown={(e) => handleKeyDown(e, "/shopping-cart")}
          >
            <div className={styles.cartItemsContainer} tabIndex="0">
              <img
                src={imgCart}
                alt="Shopping cart icon."
                className={styles.cartIcon}
                tabIndex="0" // Makes the cart icon focusable
              />
              {totalItems > 0 && (
                <div className={styles.cartItemsNum}>{totalItems}</div>
              )}
            </div>
          </Link>
        </li>
      </ul>
      {onShopPage === "/shop" && <Searchbar onSearch={onSearch} />}
    </nav>
  );
}
