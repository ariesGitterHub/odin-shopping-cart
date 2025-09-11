import { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartContext, CartProvider } from "../src/context/CartContext"; // Import CartProvider directly

function TestComponent() {
  const { cartItems, handleAddToCart, handleRemoveCartItem } =
    useContext(CartContext);

  return (
    <div>
      <button
        onClick={() =>
          handleAddToCart({
            id: 1,
            baseSKU: "sku1",
            name: "Test Product",
            selectedSize: "M",
            selectedSizeQuantity: 2,
            selectedSizeSKU: "sku1-M",
            finalPrice: 100,
            discountPercent: 10,
            image: "img.png",
            brand: "testbrand",
          })
        }
      >
        Add Item
      </button>

      <button
        onClick={() =>
          handleRemoveCartItem({
            id: 1,
            sku: "sku1-M",
          })
        }
      >
        Remove Item
      </button>

      <div data-testid="cart-count">{cartItems.length}</div>
      <div data-testid="cart-quantity">
        {cartItems.length > 0 ? cartItems[0].quantity : 0}
      </div>
    </div>
  );
}

describe("CartContext", () => {
  it("adds an item to the cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartCount = screen.getByTestId("cart-count");
    const cartQuantity = screen.getByTestId("cart-quantity");

    expect(cartCount.textContent).toBe("0");

    userEvent.click(addButton);

    // Wait for the cart count and quantity to be updated
    await waitFor(() => expect(cartCount.textContent).toBe("1"));
    expect(cartQuantity.textContent).toBe("1");
  });

  it("increments quantity if same SKU is added", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartQuantity = screen.getByTestId("cart-quantity");

    userEvent.click(addButton);
    userEvent.click(addButton);

    await waitFor(() => expect(cartQuantity.textContent).toBe("2"));
  });

  it("does not exceed available quantity", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartQuantity = screen.getByTestId("cart-quantity");

    userEvent.click(addButton); // Adds 1 item
    userEvent.click(addButton); // Adds another item, now quantity = 2
    userEvent.click(addButton); // Should not add more because max quantity is 2

    await waitFor(() => expect(cartQuantity.textContent).toBe("2"));
  });

  it("removes item from cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const removeButton = screen.getByText("Remove Item");
    const cartCount = screen.getByTestId("cart-count");

    userEvent.click(addButton);

    await waitFor(() => expect(cartCount.textContent).toBe("1"));

    userEvent.click(removeButton);

    await waitFor(() => expect(cartCount.textContent).toBe("0"));
  });
});
