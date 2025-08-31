
import styles from "../styles/Shop.module.css";
// import { inventory } from "../data/inventory";
import { useOutletContext } from "react-router-dom";

import imgSizesDinojama from "../assets/imgSizesDinojama.JPG";
import imgSizesJammyMart from "../assets/imgSizesJammyMart.JPG";
import imgSizesMooshiDoo from "../assets/imgSizesMooshiDoo.JPG";
import imgSizesPlushies from "../assets/imgSizesPlushies.JPG";
import imgSizesSpanko from "../assets/imgSizesSpanko.JPG";
import imgSizes from "../assets/imgSizesSpanko.JPG";

import Card from "../components/Card";

export default function Shop() {

  const {
    filteredProducts, 
    //onesies
   } = useOutletContext();

  // const onesies = inventory.map((product) => {
  //   const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
  //   const sizes = product.stock
  //     .filter((item) => item.quantity > 0)
  //     .map((item) => item.size);

  //   return {
  //     ...product,
  //     currentTotalStockNumber: total,
  //     availableSizes: sizes,
  //   };
  // });

  return (
    <div className={styles.mainContainer}>
      {/* BELOW - filteredProducts replaces onesies */}
      {/* {onesies.map((card) => ( */}
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
              rating={card.rating}
              numberReviews={card.numberReviews}
              price={card.price}
            />
          </div>
        ))
      ) : (
        <p className={styles.noProductsFound}>no products found...</p> // Fallback when no products match the search
      )}
    </div>
  );
}
