
import styles from "../styles/Shop.module.css";
import { inventory } from "../data/inventory";
import imgSizesDinojama from "../assets/imgSizesDinojama.JPG";
import imgSizesJammyMart from "../assets/imgSizesJammyMart.JPG";
import imgSizesMooshiDoo from "../assets/imgSizesMooshiDoo.JPG";
import imgSizesPlushies from "../assets/imgSizesPlushies.JPG";
import imgSizesSpanko from "../assets/imgSizesSpanko.JPG";
import imgSizes from "../assets/imgSizesSpanko.JPG";

import Card from "../components/Card";

export default function Shop() {
  const onesies = inventory.map((product) => {
    const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
    const sizes = product.stock
      .filter((item) => item.quantity > 0)
      .map((item) => item.size);

    return {
      ...product,
      currentTotalStockNumber: total,
      availableSizes: sizes,
    };
  });

  return (
    <div className={styles.mainContainer}>
      {onesies.map((card) => (
        <div key={card.id}>
          <Card
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
      ))}
    </div>
  );
}
