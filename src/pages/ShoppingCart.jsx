// import { useCart } from "../context/CartContext"; // Import the useCart hook
// import styles from "../styles/ShoppingCart.module.css";

// export default function ShoppingCart() {
//   const { cartItems } = useCart(); // Destructure cartItems from context

//   return (
//     <>
//       <div>
//         <h1>Checkout Page!</h1>
//         <div>
//           {cartItems.map((item, index) => (
//             <div key={index} className={styles.checkOutItemContainer}>
//               <p>
//                 {/* {item.baseSKU}-{item.size} */}
//               </p>
//               &nbsp;
//               <p>{item.name}</p>
//               &nbsp;
//               <p>{item.size}</p>
//               &nbsp;
//               <p>{item.quantity}</p>
//               &nbsp;
//               <p>{item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import { useCart } from "../context/CartContext";
import CheckoutCard from "../components/CheckoutCard";
import Button from "../components/Button";
import styles from "../styles/ShoppingCart.module.css";

export default function ShoppingCart() {
  const { cartItems, setCartItems } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

    const handleQuantityChange = (sku, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.sku === sku ? { ...item, quantity: newQuantity } : item
        )
      );
    };

  return (
    <div className={styles.mainContainer}>
      <h1>shopping cart</h1>
      <div className={styles.cartItemContainer}>
        {/* <h1>your cart!!!</h1> */}
        {cartItems.length === 0 ? (
          <p className={styles.emptyCartMsg}>your cart is currently empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <CheckoutCard
              key={`${item.baseSku}-${item.size}-${index}`}
              item={item}
              onQuantityChange={handleQuantityChange} // Pass the handler to CheckoutCard
            />
          ))
        )}
      </div>
      {/* <br /> */}
      {/* <div className={styles.itemTotal}>
        <h4>Shipping is FREE!</h4>
        <h3>Subtotal: ${total.toFixed(2)}</h3>
        <h3>*Tax calculated at payment*</h3>
      </div> */}
      <div className={styles.summaryContainer}>
        <h2>Order Summary</h2>

        <div className={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Optional placeholder for tax */}
        <div className={styles.summaryLine}>
          <span>Tax:</span>
          <span>Calculated at checkout</span>
        </div>

        {/* Total could be subtotal only for mock */}
        <div className={styles.summaryLineTotal}>
          <strong>Total:</strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        <hr className={styles.divider} />

        <h3>Select Payment Method</h3>

        <div className={styles.paymentButtons}>
          {/* <button
            className={styles.paypalButton}
            onClick={() => alert("Redirecting to PayPal... (mock)")}
          >
            Pay with PayPal
          </button>
          <button
            className={styles.cardButton}
            onClick={() =>
              alert("Redirecting to Credit Card payment... (mock)")
            }
          >
            Pay with Card
          </button>
          <button
            className={styles.appleButton}
            onClick={() => alert("Redirecting to Apple Pay... (mock)")}
          >
            Apple Pay
          </button> */}
          <Button
            variant="paypalButton"
            onClick={() => alert("Redirecting to PayPal... (mock)")}
          >
            Pay with PayPal
          </Button>
          <Button
            variant="cardButton"
            onClick={() =>
              alert("Redirecting to Credit Card payment... (mock)")
            }
          >
            Pay with Card
          </Button>
          <Button
            variant="appleButton"
            onClick={() => alert("Redirecting to Apple Pay... (mock)")}
          >
            Apple Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
