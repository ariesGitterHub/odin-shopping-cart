export default function PricingConfig({
  price,
  stockNumber,
  rating,
  numberReviews,
}) {
  // No discount for out-of-stock
  if (stockNumber === 0) {
    return {
      discountPercent: 0,
      finalPrice: price,
      reason: "Out of stock",
    };
  }

  // Calculate a "popularity score"
  const popularityScore = rating * Math.log2(numberReviews + 1); // +1 to avoid log(0)

  let discountPercent = 0;
  let reason = "";

  if (stockNumber >= 8) {
    if (popularityScore < 10) {
      discountPercent = 20;
      reason = "High stock, low popularity";
    } else if (popularityScore < 15) {
      discountPercent = 10;
      reason = "High stock, moderate popularity";
    } else {
      discountPercent = 5;
      reason = "High stock, but still popular";
    }
  } else if (stockNumber >= 4) {
    if (popularityScore < 10) {
      discountPercent = 10;
      reason = "Moderate stock, low popularity";
    } else {
      discountPercent = 5;
      reason = "Moderate stock, some popularity";
    }
  } else {
    // stock 1–3 → no discount
    discountPercent = 0;
    reason = "Low stock";
  }

  const finalPrice = +(price * (1 - discountPercent / 100)).toFixed(2);

  return {
    discountPercent,
    finalPrice,
    reason,
  };
}
