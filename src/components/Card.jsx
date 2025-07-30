import styles from "../styles/Card.module.css";
import RatingStars from "../utils/RatingStars";
import ProductPrice from "./ProductPrice";

export default function Card({
    id,
  name,
  imgFront,
  imgRear,
  imgSizing,
  brand,
  stock,
  availableSizes,
  rating,
  numberReviews,
  price
}) {
  return (
    <div className={styles.cardContainer}>
      <h1>{name}</h1>
      <p className={styles.brand}>
        {" "}
        by&nbsp;
        {brand === "Dinojama" ? (
          <span className={styles.dinojama}>{brand}</span>
        ) : brand === "Jammy Mart" ? (
          <span className={styles.jammyMart}>{brand}</span>
        ) : brand === "Mooshi-doo" ? (
          <span className={styles.mooshiDoo}>{brand}</span>
        ) : brand === "Plushies" ? (
          <span className={styles.plushies}>{brand}</span>
        ) : brand === "Spanko" ? (
          <span className={styles.spanko}>{brand}</span>
        ) : (
          <span>{brand}</span>
        )}
      </p>
      <div className={styles.imgContainer}>
        <img
          src={imgFront}
          alt={`${name} onesie front view`}
          className={styles.imgFront}
        />
        <div className={styles.smallSideImgContainer}>
          <img
            src={imgRear}
            alt={`${name} onesie rear view`}
            className={styles.smallSideImg}
          />
          <img
            src={imgSizing}
            alt={`${name} onesie sizing information`}
            className={styles.smallSideImg}
          />
        </div>
      </div>
      <div className={styles.detailsContainer}>
        {/* <p className={styles.stock}>{stock} Left</p> */}
        {/* {availableSizes.map((sizes) => {
        <p className={styles.sizes}>Available in: {sizes}</p>    
        })} */}
        {stock < 1 ? (
          <p className={styles.outOfStock}>out of stock</p>
        ) : (
          <p className={styles.stock}>{stock} left</p>
        )}
        <div className={styles.sizes}>
          {availableSizes.length === 0 ? (
            <p>no sizes available</p>
          ) : (
            <>
              <p>sizes:&nbsp;</p>
              {availableSizes.map((size, index) => (
                <span key={index} className={styles.sizeItem}>
                  {size}
                </span>
              ))}
            </>
          )}
        </div>
        <div className={styles.rating}>
          <p>{rating}</p> <RatingStars rating={rating} />{" "}
          <p>({numberReviews} reviews)</p>
        </div>
        <div className={styles.priceContainer}>
                  <div key={id} className={styles.price}>
          <ProductPrice price={price} stock={stock} rating={rating} numberReviews={numberReviews} />
        </div>
 </div>
      </div>
    </div>
  );
}
