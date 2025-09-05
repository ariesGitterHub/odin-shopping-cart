import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import * as CartContext from "../src/context/useCart";
import * as Router from "react-router-dom";

// Mock useCart context hook
vi.spyOn(CartContext, "useCart").mockReturnValue({
  cartItems: [
    { sku: "123", quantity: 2 },
    { sku: "456", quantity: 3 },
  ],
});

// Helper to mock useLocation with a given pathname
function mockUseLocation(pathname) {
  vi.spyOn(Router, "useLocation").mockReturnValue({ pathname });
}

test("renders all navigation links and icons", () => {
  mockUseLocation("/");

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
  mockUseLocation("/");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText("5")).toBeInTheDocument(); // 2 + 3 = 5 total items
});

test("does not show total items when cart is empty", () => {
  CartContext.useCart.mockReturnValueOnce({ cartItems: [] });
  mockUseLocation("/");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // The cart items number badge should NOT be in the document
  expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
});

test("renders Searchbar only on /shop page", () => {
  // On /shop page, Searchbar should be rendered
  mockUseLocation("/shop");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByRole("searchbox")).toBeInTheDocument();

  // On other pages, Searchbar should NOT be rendered
  mockUseLocation("/about");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
});
