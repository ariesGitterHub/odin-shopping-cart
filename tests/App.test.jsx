import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createMemoryRouter } from "react-router-dom";
import App from "../src/App"; // Assuming App.jsx is in the src directory

// Mocking API call
vi.mock("../src/api/api", () => ({
  fetchInventory: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        animalType: "Frog",
        tags: ["cute", "green"],
        stock: [
          { sku: "frog001", size: "M", quantity: 10 },
          { sku: "frog002", size: "L", quantity: 5 },
        ],
      },
      {
        id: 2,
        animalType: "Cat",
        tags: ["cute", "fluffy"],
        stock: [
          { sku: "cat001", size: "M", quantity: 20 },
          { sku: "cat002", size: "L", quantity: 8 },
        ],
      },
    ])
  ),
}));

describe("App Component", () => {
  test("displays loading message while inventory is being fetched", () => {
    render(<App />); // Render the app

    // Check if the loading message is rendered before data is fetched
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders Navbar and search functionality", async () => {
    // Mock the inventory data and ensure it's returned when fetchInventory is called
    require("../src/api/api").fetchInventory.mockResolvedValue([
      {
        id: 1,
        animalType: "Frog",
        tags: ["cute", "green"],
        stock: [
          { sku: "frog001", size: "M", quantity: 10 },
          { sku: "frog002", size: "L", quantity: 5 },
        ],
      },
    ]);

    render(<App />); // Render the app

    // Wait for loading to finish and check if the Navbar is rendered
    await waitFor(() =>
      expect(screen.getByAltText("Cute frog head icon.")).toBeInTheDocument()
    );

    // Ensure the search input is visible
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    // Simulate search in Navbar and check if the correct filtered product is shown
    fireEvent.change(searchInput, {
      target: { value: "frog" },
    });

    // Wait for the filtered product to appear
    await waitFor(() => expect(screen.getByText(/frog/i)).toBeInTheDocument());
  });

  test("routes to the correct page", async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <div>Home Page</div> },
          { path: "shop", element: <div>Shop Page</div> },
          { path: "about", element: <div>About Page</div> },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    // Check initial page (Home)
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();

    // Simulate navigation to Shop page
    fireEvent.click(screen.getByText(/shop/i));

    // Check that the Shop page renders
    expect(await screen.findByText(/Shop Page/i)).toBeInTheDocument();

    // Simulate navigation to About page
    fireEvent.click(screen.getByText(/about/i));

    // Check that the About page renders
    expect(await screen.findByText(/About Page/i)).toBeInTheDocument();
  });

  test("shows filtered products based on search query", async () => {
    // Mock the API call to fetch inventory
    require("../src/api/api").fetchInventory.mockResolvedValue([
      {
        id: 1,
        animalType: "Frog",
        tags: ["cute", "green"],
        stock: [
          { sku: "frog001", size: "M", quantity: 10 },
          { sku: "frog002", size: "L", quantity: 5 },
        ],
      },
      {
        id: 2,
        animalType: "Cat",
        tags: ["cute", "fluffy"],
        stock: [
          { sku: "cat001", size: "M", quantity: 20 },
          { sku: "cat002", size: "L", quantity: 8 },
        ],
      },
    ]);

    render(<App />);

    // Wait for the data to be fetched and for the component to render
    await waitFor(() =>
      expect(screen.getByAltText("Cute frog head icon.")).toBeInTheDocument()
    );

    // Ensure the search input is rendered
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    // Simulate typing "frog" into the search bar
    fireEvent.change(searchInput, { target: { value: "frog" } });

    // Wait for the filtered product to appear
    await waitFor(() => {
      console.log(screen.getByText(/frog/i)); // Log the element
      expect(screen.getByText(/frog/i)).toBeInTheDocument(); // Check if the product appears
    });
  });
});
