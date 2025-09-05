import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { CartProvider, CartContext } from "../src/context/CartContext";
import { useContext } from "react";

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
  it("adds an item to the cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartCount = screen.getByTestId("cart-count");
    const cartQuantity = screen.getByTestId("cart-quantity");

    expect(cartCount.textContent).toBe("0");

    act(() => {
      userEvent.click(addButton);
    });

    expect(cartCount.textContent).toBe("1");
    expect(cartQuantity.textContent).toBe("1");
  });

  it("increments quantity if same SKU is added", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartQuantity = screen.getByTestId("cart-quantity");

    act(() => {
      userEvent.click(addButton);
      userEvent.click(addButton);
    });

    // Quantity should increase to 2
    expect(cartQuantity.textContent).toBe("2");
  });

  it("does not exceed available quantity", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const cartQuantity = screen.getByTestId("cart-quantity");

    // Max quantity is 2 as per handleAddToCart params (selectedSizeQuantity: 2)
    act(() => {
      userEvent.click(addButton);
      userEvent.click(addButton);
      userEvent.click(addButton); // This one should not increase quantity
    });

    expect(cartQuantity.textContent).toBe("2");
  });

  it("removes item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Item");
    const removeButton = screen.getByText("Remove Item");
    const cartCount = screen.getByTestId("cart-count");

    act(() => {
      userEvent.click(addButton);
    });

    expect(cartCount.textContent).toBe("1");

    act(() => {
      userEvent.click(removeButton);
    });

    expect(cartCount.textContent).toBe("0");
  });
});
