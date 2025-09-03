import styles from "../styles/CheckoutCard.module.css";

export default function CheckoutCard({ item, onQuantityChange }) {
  const { id, availableQuantityInSize, sku, name, brand, image, size, quantity, price } = item;

    const handleIncrement = () => onQuantityChange(sku, quantity + 1);
    const handleDecrement = () => onQuantityChange(sku, quantity - 1);

  return (
    <div className={styles.card}>
      <div className={styles.nameContainer}>
        <h2 className={styles.name}>{name}</h2> &nbsp;
        <p className={styles.brand}>
          by&nbsp;
          {brand === "dinojama" ? (
            <span className={styles.dinojama}>{brand}</span>
          ) : brand === "jammy mart" ? (
            <span className={styles.jammyMart}>{brand}</span>
          ) : brand === "mooshi-doo" ? (
            <span className={styles.mooshiDoo}>{brand}</span>
          ) : brand === "plushies" ? (
            <span className={styles.plushies}>{brand}</span>
          ) : brand === "spanko" ? (
            <span className={styles.spanko}>{brand}</span>
          ) : (
            <span>{brand}</span>
          )}
        </p>
      </div>

      {/* <p className={styles.productReminder}>adult unisex onesie</p> */}
      {/*<p className={styles.productReminder}>adult unisex onesie</p> */}
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
          <p className={styles.price}>
            price: ${(price * quantity).toFixed(2)}
          </p>
        </div>
        <div className={styles.productDetails}>
          {/* <h2>{name}</h2> */}

          {/* <p>brand: {brand}</p> */}
          <p>
            size: <span className={styles.sizeUppercase}>{size}</span>
          </p>
          {/* <p>quantity: {quantity}</p> */}
          <div className="quantity-control">
            <button onClick={handleDecrement} disabled={quantity <= 1}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          {/* <p className={styles.bold}>price: ${(price * quantity).toFixed(2)}</p> */}
        </div>
      </div>
    </div>
  );
}
