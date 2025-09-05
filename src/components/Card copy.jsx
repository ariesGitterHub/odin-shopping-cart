import { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/Card.module.css";
import RatingStars from "../utils/RatingStars";
import ProductPrice from "./ProductPrice";
import PriceConfig from "../utils/PricingConfig";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import Button from "./Button";

export default function Card({
  id,
  baseSKU,
  name,
  imgFront,
  imgRear,
  imgSizing,
  brand,
  stockNumber,
  availableSizes,
  availableQuantities,
  availableSKUs,
  rating,
  numberReviews,
  price,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
  const [selectedSizeSKU, setSelectedSizeSKU] = useState(null);
  const images = [imgFront, imgRear, imgSizing];
  const { handleAddToCart } = useCart();

  // NOTE - Below: I need this in Card.jsx to grab computed prices for add to cart button
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

  const handleSizeSelect = (size) => {
    setSelectedSize(size);

    // Finds the index of the selected size
    const sizeIndex = availableSizes.indexOf(size);

    // Sets the corresponding quantity and SKU based on the size selected
    setSelectedSizeQuantity(availableQuantities[sizeIndex]);
    setSelectedSizeSKU(availableSKUs[sizeIndex]);
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
          <div key={id}>
            <ProductPrice
              price={price}
              stockNumber={stockNumber}
              rating={rating}
              numberReviews={numberReviews}
              finalPrice={finalPrice}
            />
          </div>
          {discountPercent > 0 && (
            <p className={styles.priceSavings}>Save {discountPercent}%</p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          {availableSizes.length > 0 && (
            <Dropdown
              label="Size"
              options={availableSizes}
              onSelect={(size) => {
                handleSizeSelect(size);
              }}
            />
          )}
          {/* TODO - Below this is temporary */}
          {availableSizes.length > 0 && (
            <Button
              variant="cart"
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size.");
                  return;
                }

                console.log("selectedSize is:", selectedSize);
                console.log("selectedQuantity is:", selectedSizeQuantity);
                console.log("selectedSKU is:", selectedSizeSKU);

                const itemToAdd = {
                  id,
                  baseSKU,
                  name,
                  selectedSize,
                  selectedSizeQuantity,
                  selectedSizeSKU,
                  finalPrice,
                  discountPercent,
                  image: imgFront,
                  brand,
                };
                // console.log("[Card] selectedSize before add:", selectedSize);
                // console.log("[Card] Adding to cart:", itemToAdd);
                handleAddToCart(itemToAdd);

                // TEMP:
                // setTimeout(() => {
                //   console.log("[Card] Cart after add:", cartItems);
                // }, 200);
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
