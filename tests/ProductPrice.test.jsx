import { render, screen } from "@testing-library/react";
import ProductPrice from "../src/components/ProductPrice";
import * as PricingConfigModule from "../src/utils/PricingConfig";

vi.mock("../src/utils/PricingConfig");

describe("ProductPrice component", () => {
  it("renders original price with line-through and final price when discountPercent > 0", () => {
    PricingConfigModule.default.mockReturnValue({
      finalPrice: 80,
      discountPercent: 20,
    });

    render(
      <ProductPrice
        price={100}
        stockNumber={10}
        rating={4.5}
        numberReviews={10}
      />
    );

    expect(screen.getByText("$100")).toHaveStyle(
      "text-decoration: line-through"
    );
    expect(screen.getByText("$80")).toBeInTheDocument();
  });

  it("renders only final price when discountPercent is 0", () => {
    PricingConfigModule.default.mockReturnValue({
      finalPrice: 100,
      discountPercent: 0,
    });

    render(
      <ProductPrice
        price={100}
        stockNumber={10}
        rating={4.5}
        numberReviews={10}
      />
    );

    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(
      screen.queryByText("$100", { selector: "span" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });
});
