import { useCart } from "../context/CartContext"; // Import the useCart hook
import styles from "../styles/ShoppingCart.module.css";

export default function ShoppingCart() {
  const { cartItems } = useCart(); // Destructure cartItems from context

  return (
    <>
      <div>
        <h1>Checkout!</h1>
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.changeLater}>
              <p>
                {item.baseSKU}-{item.size}
              </p>
              &nbsp;
              <p>{item.name}</p>
              &nbsp;
              <p>{item.size}</p>
              &nbsp;
              <p>{item.quantity}</p>
              &nbsp;
              <p>
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
