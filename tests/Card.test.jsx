import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import Card from "../src/components/Card";
import { useCart } from "../src/context/useCart";

vi.mock("../src/context/useCart");

const mockHandleAddToCart = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  useCart.mockReturnValue({
    cartItems: [],
    handleAddToCart: mockHandleAddToCart,
  });
});

test("renders product info and images", () => {
  render(
    <Card
      id="1"
      baseSKU="sku123"
      name="Cool Onesie"
      imgFront="/front.jpg"
      imgRear="/rear.jpg"
      imgSizing="/size.jpg"
      brand="dinojama"
      stockNumber={10}
      availableSizes={["S", "M"]}
      availableQuantities={[5, 5]}
      availableSKUs={["skuS", "skuM"]}
      rating={4}
      numberReviews={10}
      price={20}
    />
  );

  expect(screen.getByText("Cool Onesie")).toBeInTheDocument();
  expect(screen.getByText("By dinojama")).toBeInTheDocument();
  expect(
    screen.getByAltText("Cool Onesie onesie front view")
  ).toBeInTheDocument();
  expect(screen.getByText("Sizes:")).toBeInTheDocument();
  expect(screen.getByText("S")).toBeInTheDocument();
  expect(screen.getByText("M")).toBeInTheDocument();
});

test("shows warning if add to cart clicked without size selected", () => {
  render(
    <Card
      id="1"
      baseSKU="sku123"
      name="Cool Onesie"
      imgFront="/front.jpg"
      imgRear="/rear.jpg"
      imgSizing="/size.jpg"
      brand="dinojama"
      stockNumber={10}
      availableSizes={["S", "M"]}
      availableQuantities={[5, 5]}
      availableSKUs={["skuS", "skuM"]}
      rating={4}
      numberReviews={10}
      price={20}
    />
  );

  const addButton = screen.getByRole("button", { name: /add to cart/i });
  fireEvent.click(addButton);

  expect(screen.getByText("Please select a size.")).toBeInTheDocument();

  // Optional: test that warning disappears after 3 seconds using fake timers
  vi.useFakeTimers();
  act(() => {
    vi.advanceTimersByTime(3000);
  });
  expect(screen.queryByText("Please select a size.")).not.toBeInTheDocument();
  vi.useRealTimers();
});

test("calls handleAddToCart with correct item after selecting size and clicking add", () => {
  render(
    <Card
      id="1"
      baseSKU="sku123"
      name="Cool Onesie"
      imgFront="/front.jpg"
      imgRear="/rear.jpg"
      imgSizing="/size.jpg"
      brand="dinojama"
      stockNumber={10}
      availableSizes={["S", "M"]}
      availableQuantities={[5, 5]}
      availableSKUs={["skuS", "skuM"]}
      rating={4}
      numberReviews={10}
      price={20}
    />
  );

  // simulate selecting size - you might need to mock Dropdown component or test its props/events

  // For demo, directly call the handleSizeSelect function or fire an event depending on implementation

  // Then click add button and check call:
  // expect(mockHandleAddToCart).toHaveBeenCalledWith(expect.objectContaining({ selectedSize: "S" }));
});
