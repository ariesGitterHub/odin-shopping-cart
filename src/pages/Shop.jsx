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

  const onesies = [...inventory]
  return (
    <div className={styles.mainContainer}>
      {onesies.map((card) => (
        <div key={card.id}>
          <Card
            name={card.animalType}
            imgFront={card.imageFront}
            imgRear={card.imageRear}
            imgSizing={
              card.brand === "Dinojama"
                ? imgSizesDinojama
                : card.brand === "Jammy Mart"
                ? imgSizesJammyMart
                : card.brand === "Mooshi-doo"
                ? imgSizesMooshiDoo
                : card.brand === "Plushies"
                ? imgSizesPlushies
                : card.brand === "Spanko"
                ? imgSizesSpanko
                : imgSizes
            }
            brand={card.brand}
            stock={card.stock}
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
