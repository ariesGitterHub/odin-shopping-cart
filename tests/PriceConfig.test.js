import PricingConfig from "../src/utils/PricingConfig";

describe("PricingConfig", () => {
  it("returns no discount when stockNumber is 0", () => {
    const result = PricingConfig({
      price: 100,
      stockNumber: 0,
      rating: 4,
      numberReviews: 10,
    });
    expect(result.discountPercent).toBe(0);
    expect(result.finalPrice).toBe(100);
    expect(result.reason).toBe("Out of stock");
  });

  it("applies 20% discount for high stock and low popularity", () => {
    const result = PricingConfig({
      price: 100,
      stockNumber: 10,
      rating: 1,
      numberReviews: 1,
    });
    expect(result.discountPercent).toBe(20);
    expect(result.finalPrice).toBe(80);
    expect(result.reason).toBe("High stock, low popularity");
  });

  it("applies 10% discount for moderate stock and low popularity", () => {
    const result = PricingConfig({
      price: 100,
      stockNumber: 5,
      rating: 1,
      numberReviews: 1,
    });
    expect(result.discountPercent).toBe(10);
    expect(result.finalPrice).toBe(90);
  });

  it("applies no discount for low stock", () => {
    const result = PricingConfig({
      price: 100,
      stockNumber: 3,
      rating: 5,
      numberReviews: 100,
    });
    expect(result.discountPercent).toBe(0);
    expect(result.finalPrice).toBe(100);
  });

  // Add more tests for other branches as needed
});
