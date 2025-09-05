import { useState } from "react";
import { useCart } from "../context/useCart";
import styles from "../styles/Card.module.css";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import PriceConfig from "../utils/PricingConfig";
import ProductPrice from "./ProductPrice";
import RatingStars from "../utils/RatingStars";

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
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [sizeWarningText, setSizeWarningText] = useState("");

  const images = [imgFront, imgRear, imgSizing];
  const { cartItems, handleAddToCart } = useCart();

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
    setShowSizeWarning(false);

    // Finds the index of the selected size
    const sizeIndex = availableSizes.indexOf(size);
    // Sets the corresponding quantity and SKU based on the size selected
    setSelectedSizeQuantity(availableQuantities[sizeIndex]);
    setSelectedSizeSKU(availableSKUs[sizeIndex]);
  };

  const handleClick = () => {
    if (!selectedSize) {
      setSizeWarningText("Please select a size.");
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    const currentCartItem = cartItems.find(
      (item) => item.sku === selectedSizeSKU
    );

    const currentQuantityInCart = currentCartItem
      ? currentCartItem.quantity
      : 0;

    if (currentQuantityInCart >= selectedSizeQuantity) {
      setSizeWarningText(
        `Only ${selectedSizeQuantity} in stock for this size.`
      );
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

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

    handleAddToCart(itemToAdd);
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
          <p>{rating}</p> <RatingStars rating={rating} />
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
            <>
              <Dropdown
                label="Size"
                options={availableSizes}
                onSelect={handleSizeSelect}
              />
              <Button variant="cart" onClick={handleClick}>
                Add to Cart
              </Button>
              {showSizeWarning && (
                <div className={styles.sizeWarningMessage}>
                  {sizeWarningText}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
