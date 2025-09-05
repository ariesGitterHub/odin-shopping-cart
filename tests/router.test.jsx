// router.test.jsx
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

describe("App Routing", () => {
  test("renders Home component on default route", () => {
    window.history.pushState({}, "Home", "/");

    render(<RouterProvider router={router} />);

    // Replace this with something unique to your Home page
    expect(screen.getByText(/welcome to home/i)).toBeInTheDocument();
  });

  test("renders Shop component on /shop route", () => {
    window.history.pushState({}, "Shop", "/shop");

    render(<RouterProvider router={router} />);

    // Replace with something unique to your Shop page
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  test("renders About component on /about route", () => {
    window.history.pushState({}, "About", "/about");

    render(<RouterProvider router={router} />);

    // Replace with something unique to your About page
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test("renders Contact component on /contact route", () => {
    window.history.pushState({}, "Contact", "/contact");

    render(<RouterProvider router={router} />);

    // Replace with something unique to your Contact page
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test("renders ShoppingCart component on /shopping-cart route", () => {
    window.history.pushState({}, "ShoppingCart", "/shopping-cart");

    render(<RouterProvider router={router} />);

    // Replace with something unique to your ShoppingCart page
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
  });

  test("renders NotFound component on unknown route", () => {
    window.history.pushState({}, "NotFound", "/some/unknown/path");

    render(<RouterProvider router={router} />);

    // Replace with something unique to your NotFound page, e.g., "404" or "Page not found"
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
