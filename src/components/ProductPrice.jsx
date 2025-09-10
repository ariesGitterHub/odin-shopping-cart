import PricingConfig from "../utils/PricingConfig";

export default function ProductPrice({
  price,
  stockNumber,
  rating,
  numberReviews,
}) {
  const { finalPrice, discountPercent } = PricingConfig({
    price,
    stockNumber,
    rating,
    numberReviews,
  });

  return (
    <div>
      {discountPercent > 0 ? (
        <p>
          Price:&nbsp;
          <span style={{ textDecoration: "line-through" }}>${price}</span>
          &nbsp;
          <strong>${finalPrice}</strong>
          {/* NOTE - Below was moved to Card.jsx */}
          {/* <span>({discountPercent}% off)</span> */}
        </p>
      ) : (
        <p>
          Price: <strong>${finalPrice}</strong>
        </p>
      )}
    </div>
  );
}
