import { useCart } from "../context/useCart";
import styles from "../styles/ShoppingCart.module.css";
import CheckoutCard from "../components/CheckoutCard";
import Button from "../components/Button";

export default function ShoppingCart() {
  const { cartItems, setCartItems, handleRemoveCartItem } = useCart();

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
        {cartItems.length === 0 ? (
          <p className={styles.emptyCartMsg}>Your cart is currently empty</p>
        ) : (
          cartItems.map((item, index) => (
            <CheckoutCard
              key={`${item.baseSku}-${item.size}-${index}`}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemoveCartItem={handleRemoveCartItem}
            />
          ))
        )}
      </div>
      <div className={styles.summaryContainer}>
        <h2>Order Summary</h2>
        <div className={styles.summaryLine}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          <span>Tax:</span>
          <span>Calculated at checkout</span>
        </div>
        <div className={styles.summaryLineTotal}>
          <strong>Total:</strong>
          <strong>${subtotal.toFixed(2)} + Tax</strong>
        </div>
        <hr className={styles.divider} />
        <h3>Select Payment Method</h3>
        <div className={styles.paymentButtons}>
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
