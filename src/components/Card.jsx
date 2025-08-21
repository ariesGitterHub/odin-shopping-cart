import { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/Card.module.css";
import RatingStars from "../utils/RatingStars";
import ProductPrice from "./ProductPrice";
import PriceConfig from "../utils/PricingConfig"
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import Button from "./Button";

export default function Card({
  id,
  name,
  imgFront,
  imgRear,
  imgSizing,
  brand,
  stock, // TODO - handle this if not used...
  stockNumber,
  availableSizes,
  rating,
  numberReviews,
  price,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const images = [imgFront, imgRear, imgSizing];

  // Below: I need this in Card.jsx to grab computed prices for add to cart button
const { handleAddToCart } = useCart();

const { finalPrice, discountPercent } = PriceConfig({
  price,
  stockNumber,
  rating,
  numberReviews,
});


  const openModal = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  return (
    <div className={styles.cardContainer}>
      <h1>{name}</h1>
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
      <div className={styles.imgContainer}>
        <img
          src={imgFront}
          alt={`${name} onesie front view`}
          className={styles.imgFront}
          onClick={() => openModal(0)}
        />
        <div className={styles.smallSideImgContainer}>
          <img
            src={imgRear}
            alt={`${name} onesie rear view`}
            className={styles.smallSideImg}
            onClick={() => openModal(1)}
          />
          <img
            src={imgSizing}
            alt={`${name} onesie sizing information`}
            className={styles.smallSideImg}
            onClick={() => openModal(2)}
          />
          {isOpen && (
            <Modal
              images={images}
              currentIndex={currentImage}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
      <div className={styles.detailsContainer}>
        {/* <p className={styles.stock}>{stock} Left</p> */}
        {/* {availableSizes.map((sizes) => {
        <p className={styles.sizes}>Available in: {sizes}</p>    
        })} */}
        {stockNumber < 1 ? (
          <p className={styles.outOfStock}>out of stock</p>
        ) : (
          <p className={styles.stockNumber}>{stockNumber} left</p>
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
            <ProductPrice
              price={price}
              stockNumber={stockNumber}
              rating={rating}
              numberReviews={numberReviews}
              finalPrice={finalPrice} // NEW...pass explicitly if needed
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {availableSizes.length > 0 && (
            <Dropdown
              label="Size"
              options={availableSizes}
              onSelect={(size) => setSelectedSize(size)}
              // onSelect={
              //   (selectedSize) => console.log("Size selected:", selectedSize)
              //   // TODO - delete above
              //}
            />
          )}
          {/* TODO - Below this is temporary */}
          {availableSizes.length > 0 && (
            <Button
              variant="cart"
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size");
                  return;
                }

    const itemToAdd = {
      id,
      name,
      size: selectedSize,
      finalPrice,
      image: imgFront,
      brand,
    };

    console.log("[Card] Adding to cart:", itemToAdd); // ✅ LOG HERE

    handleAddToCart(itemToAdd);
              }}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
