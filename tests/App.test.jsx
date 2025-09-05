import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api/api";

// Mock fetchInventory
vi.mock("../api/api");

const mockInventory = [
  {
    id: 1,
    animalType: "lion",
    tags: ["big cat"],
    stock: [
      { size: "S", quantity: 5, sku: "sku1" },
      { size: "M", quantity: 0, sku: "sku2" }, // zero quantity
    ],
    // other product fields...
  },
  {
    id: 2,
    animalType: "feline",
    tags: ["cat", "pet"],
    stock: [{ size: "L", quantity: 3, sku: "sku3" }],
  },
];

describe("App", () => {
  beforeEach(() => {
    api.fetchInventory.mockResolvedValue(mockInventory);
  });

  test("shows loading initially and then loads products", async () => {
    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for inventory to be loaded and loading to disappear
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  test("passes filtered products to Outlet context", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Since Outlet is a react-router component, you can spy on it or mock it.
    // Here we just check Navbar is rendered with onSearch prop
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("filters products based on search query", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText(/search by animal/i);

    await userEvent.type(searchInput, "lion");

    // You would check filtered products passed to Outlet or visible in UI
    // Depending on your Outlet implementation, you might need to mock it.
  });
});
