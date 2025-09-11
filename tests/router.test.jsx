import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom"; // Use RouterProvider to render the router
import { router } from "../src/router"; // Import the router setup

describe("App Routing", () => {
  test("renders Home component on default route", () => {
    window.history.pushState({}, "Home", "/"); // Simulate visiting the Home route

    render(<RouterProvider router={router} />); // Render the router in the test

    expect(screen.getByText(/Welcome to the Application/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to our store!/i)).toBeInTheDocument(); // Make sure this matches your Home page text
  });

  test("renders Shop component on /shop route", () => {
    window.history.pushState({}, "Shop", "/shop"); // Simulate visiting the Shop route

    render(<RouterProvider router={router} />); // Render the router

    expect(screen.getByText(/shop/i)).toBeInTheDocument(); // Check for Shop page text
  });

  test("renders About component on /about route", () => {
    window.history.pushState({}, "About", "/about");

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/about us/i)).toBeInTheDocument(); // Check for About page text
  });

  test("renders Contact component on /contact route", () => {
    window.history.pushState({}, "Contact", "/contact");

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/contact us/i)).toBeInTheDocument(); // Check for Contact page text
  });

  test("renders ShoppingCart component on /shopping-cart route", () => {
    window.history.pushState({}, "ShoppingCart", "/shopping-cart");

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument(); // Check for ShoppingCart page text
  });

  test("renders NotFound component on unknown route", () => {
    window.history.pushState({}, "NotFound", "/some/unknown/path");

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/404/i)).toBeInTheDocument(); // Check for NotFound page text
  });
});
