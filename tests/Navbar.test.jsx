import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import * as CartContext from "../src/context/useCart"; // Mock useCart context

// Partial mock for react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useLocation: vi.fn(), // Mock `useLocation`
  };
});

// Mock useCart context hook
vi.spyOn(CartContext, "useCart").mockReturnValue({
  cartItems: [
    { sku: "123", quantity: 2 },
    { sku: "456", quantity: 3 },
  ],
});

describe("Navbar", () => {
  test("renders all navigation links and icons", () => {
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Cute frog head icon.")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByAltText("Shopping cart icon.")).toBeInTheDocument();
  });

  test("shows total items in cart when cart is not empty", () => {
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("5")).toBeInTheDocument(); // 2 + 3 = 5 total items
  });

  test("does not show total items when cart is empty", () => {
    CartContext.useCart.mockReturnValueOnce({ cartItems: [] });
    useLocation.mockReturnValue({ pathname: "/" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  test("renders Searchbar only on /shop page", () => {
    useLocation.mockReturnValue({ pathname: "/shop" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("searchbar")).toBeInTheDocument();

    useLocation.mockReturnValue({ pathname: "/about" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.queryByRole("searchbar")).not.toBeInTheDocument();
  });
});

