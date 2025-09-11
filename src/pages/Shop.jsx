import { useOutletContext } from "react-router-dom";
import styles from "../styles/Shop.module.css";
import Card from "../components/Card";
import imgSizesDinojama from "../assets/imgSizesDinojama.JPG";
import imgSizesJammyMart from "../assets/imgSizesJammyMart.JPG";
import imgSizesMooshiDoo from "../assets/imgSizesMooshiDoo.JPG";
import imgSizesPlushies from "../assets/imgSizesPlushies.JPG";
import imgSizesSpanko from "../assets/imgSizesSpanko.JPG";
import imgSizes from "../assets/imgSizes.JPG";

export default function Shop() {
  const { filteredProducts } = useOutletContext();

  return (
    <div className={styles.mainContainer}>
      {/* BELOW - Remember! The imported filteredProducts becomes the new version of the onesies data array */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((card) => (
          <div key={card.id}>
            <Card
              id={card.id}
              baseSKU={card.baseSKU}
              name={card.animalType}
              imgFront={card.imageFront}
              imgRear={card.imageRear}
              imgSizing={
                card.brand === "dinojama"
                  ? imgSizesDinojama
                  : card.brand === "jammy mart"
                    ? imgSizesJammyMart
                    : card.brand === "mooshi-doo"
                      ? imgSizesMooshiDoo
                      : card.brand === "plushies"
                        ? imgSizesPlushies
                        : card.brand === "spanko"
                          ? imgSizesSpanko
                          : imgSizes
              }
              brand={card.brand}
              stock={card.stock}
              stockNumber={card.currentTotalStockNumber}
              availableSizes={card.availableSizes}
              availableQuantities={card.availableQuantities}
              availableSKUs={card.availableSKUs}
              rating={card.rating}
              numberReviews={card.numberReviews}
              price={card.price}
            />
          </div>
        ))
      ) : (
        <p className={styles.noProductsFound}>No products found...</p> // Fallback when no products match the search
      )}
    </div>
  );
}
