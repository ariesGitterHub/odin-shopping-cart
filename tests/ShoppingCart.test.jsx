// tests/ShoppingCart.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "../src/pages/ShoppingCart";
import { useCart } from "../src/context/useCart";

// Mock useCart context
vi.mock("../src/context/useCart");

describe("ShoppingCart", () => {
  const mockSetCartItems = vi.fn();
  const mockHandleRemoveCartItem = vi.fn();

  beforeEach(() => {
    // Clear mocks before each test
    mockSetCartItems.mockClear();
    mockHandleRemoveCartItem.mockClear();

    // Mock alert globally
    global.alert = vi.fn();

    // Default mock implementation for useCart
    useCart.mockReturnValue({
      cartItems: [],
      setCartItems: mockSetCartItems,
      handleRemoveCartItem: mockHandleRemoveCartItem,
    });
  });

  test("shows empty cart message when cart is empty", () => {
    render(<ShoppingCart />);
    expect(
      screen.getByText(/your cart is currently empty/i)
    ).toBeInTheDocument();
  });

  test("renders CheckoutCard components for each cart item", () => {
    // Setup cart with two items
    const cartItems = [
      { baseSku: "sku1", size: "M", price: 10, quantity: 1 },
      { baseSku: "sku2", size: "L", price: 20, quantity: 2 },
    ];

    useCart.mockReturnValue({
      cartItems,
      setCartItems: mockSetCartItems,
      handleRemoveCartItem: mockHandleRemoveCartItem,
    });

    render(<ShoppingCart />);

    // There should be two CheckoutCard components rendered (find by role or text inside them)
    const items = screen.getAllByText(/remove/i); // Assuming CheckoutCard has a remove button labeled 'remove'
    expect(items.length).toBe(2);

    // Subtotal calculation: 10*1 + 20*2 = 50
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  test("payment buttons show alert when clicked", () => {
    render(<ShoppingCart />);

    fireEvent.click(screen.getByText(/pay with paypal/i));
    expect(global.alert).toHaveBeenCalledWith(
      "Redirecting to PayPal... (mock)"
    );

    fireEvent.click(screen.getByText(/pay with card/i));
    expect(global.alert).toHaveBeenCalledWith(
      "Redirecting to Credit Card payment... (mock)"
    );

    fireEvent.click(screen.getByText(/apple pay/i));
    expect(global.alert).toHaveBeenCalledWith(
      "Redirecting to Apple Pay... (mock)"
    );
  });

  // More tests could be added for quantity change and removal, depending on CheckoutCard props/events
});
