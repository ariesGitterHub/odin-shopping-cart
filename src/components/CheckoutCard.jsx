import styles from "../styles/CheckoutCard.module.css";
import Button from "./Button";

export default function CheckoutCard({ item, onQuantityChange, onRemoveCartItem }) {
  const {
    id,
    availableQuantityInSize,
    sku,
    name,
    brand,
    image,
    size,
    quantity,
    price,
  } = item;

  const handleIncrement = () => onQuantityChange(sku, quantity + 1);
  const handleDecrement = () => onQuantityChange(sku, quantity - 1);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.nameContainer}>
        <h2 className={styles.name}>
          {name} (<span className={styles.sizeUppercase}>{size}</span>)
        </h2>

        <p className={styles.availableQuantityInSize}>
          *only {availableQuantityInSize} remaining in size: {size}
        </p>

        {/* <p className={styles.brand}>
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
        </p> */}
      </div>
      {/* <div className={styles.availableQuantityInSizeContainer}>
        {" "}
        <p>({availableQuantityInSize} remaining in this size.)</p>
      </div> */}

      {/* <p className={styles.productReminder}>adult unisex onesie</p> */}
      {/*<p className={styles.productReminder}>adult unisex onesie</p> */}
      <div className={styles.rowContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
          {/* <p className={styles.price}>
            price: ${(price * quantity).toFixed(2)}
          </p> */}
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
        <div className={styles.colContainer}>
          <div className={styles.quantityContainer}>
            {/* <h2>{name}</h2> */}

            {/* <p>brand: {brand}</p> */}
            <p>quantity</p>
            {/* <p>quantity: {quantity}</p> */}
            <div className={styles.quantityControl}>
              <Button
                variant="incrementDecrementButton"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span> {quantity} </span>
              <Button
                variant="incrementDecrementButton"
                onClick={handleIncrement}
                disabled={quantity >= availableQuantityInSize}
              >
                +
              </Button>
            </div>
          </div>
          <div className={styles.priceContainer}>
            {/* <h2>{name}</h2> */}

            {/* <p>brand: {brand}</p> */}
            <p>price</p>
            {/* <p>quantity: {quantity}</p> */}
            <p className={styles.price}>${(price * quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <Button variant="removeCartItem" onClick={() => onRemoveCartItem(item)}>
        Remove Item from Cart
      </Button>
    </div>
  );
}
