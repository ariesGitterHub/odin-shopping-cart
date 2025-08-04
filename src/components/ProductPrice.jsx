import PricingConfig from "../utils/PricingConfig";

export default function ProductPrice({ price, stockNumber, rating, numberReviews }) {
  const { finalPrice, discountPercent
    // , reason 
} = PricingConfig({
    price,
    stockNumber,
    rating,
    numberReviews,
  });
//  TODO: insert styles in a module for uniformity
  return (
    <div>
      {discountPercent > 0 ? (
        <p>Price:&nbsp; 
          <span style={{ textDecoration: "line-through" }}>${price}</span>{" "}
          &nbsp;
          <strong>${finalPrice}</strong> &nbsp;
          {/* <span>({discountPercent}% off)</span> */}
        </p>
      ) : (
        <p>Price: <strong>${finalPrice}</strong></p>
      )}
      {/* <small>{reason}</small> */}
    </div>
  );
}
