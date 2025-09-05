import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Shop from "../src/pages/Shop";

// Mock the Card component (default export)
vi.mock("../src/components/Card", () => ({
  default: (props) => (
    <div data-testid="mock-card">
      Mock Card - {props.name} ({props.brand})
    </div>
  ),
}));

// Mock useOutletContext from react-router-dom
vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

import { useOutletContext } from "react-router-dom";

describe("Shop component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders product cards when filteredProducts is not empty", () => {
    // Setup mock data for filteredProducts
    const filteredProducts = [
      {
        id: 1,
        baseSKU: "SKU123",
        animalType: "Dino",
        imageFront: "front.jpg",
        imageRear: "rear.jpg",
        brand: "dinojama",
        stock: 10,
        currentTotalStockNumber: 5,
        availableSizes: ["S", "M"],
        availableQuantities: [1, 2, 3],
        availableSKUs: ["SKU123-S", "SKU123-M"],
        rating: 4.5,
        numberReviews: 12,
        price: 29.99,
      },
      {
        id: 2,
        baseSKU: "SKU456",
        animalType: "Jammy",
        imageFront: "front2.jpg",
        imageRear: "rear2.jpg",
        brand: "jammy mart",
        stock: 8,
        currentTotalStockNumber: 3,
        availableSizes: ["L", "XL"],
        availableQuantities: [1, 2],
        availableSKUs: ["SKU456-L", "SKU456-XL"],
        rating: 4.0,
        numberReviews: 8,
        price: 24.99,
      },
    ];

    // Mock useOutletContext to return this data
    useOutletContext.mockReturnValue({ filteredProducts });

    render(<Shop />);

    // We should see 2 mocked Card components rendered
    const cards = screen.getAllByTestId("mock-card");
    expect(cards).toHaveLength(2);

    // Check that product names and brands appear in mocked cards
    expect(screen.getByText(/Dino/i)).toBeInTheDocument();
    expect(screen.getByText(/dinojama/i)).toBeInTheDocument();
    expect(screen.getByText(/Jammy/i)).toBeInTheDocument();
    expect(screen.getByText(/jammy mart/i)).toBeInTheDocument();
  });

  test("renders fallback message when filteredProducts is empty", () => {
    useOutletContext.mockReturnValue({ filteredProducts: [] });

    render(<Shop />);

    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });
});
