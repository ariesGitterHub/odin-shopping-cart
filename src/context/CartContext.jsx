import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart({
    id,
    baseSKU,
    name,
    // size,
    selectedSize,
    selectedSizeQuantity,
    selectedSizeSKU,
    finalPrice,
    discountPercent,
    image,
    brand,
  }) {
    setCartItems((prev) => {
      // const existingIndex = prev.findIndex(
      //   // (item) => item.id === id && item.size === size
      //   (item) => item.id === id && item.size === size
      // );
      const existingIndex = prev.findIndex(
        (item) => item.sku === selectedSizeSKU
      );

      // if (existingIndex !== -1) {
      //   const updated = [...prev];
      //   updated[existingIndex].quantity += 1;
      //   return updated;
      // }
      if (existingIndex !== -1) {
        const existingItem = prev[existingIndex];

        // Inventory check to prevent exceeding available quantity
        if (existingItem.quantity >= selectedSizeQuantity) {
          console.warn(
            `[CartContext] Cannot add more. Already at max quantity for SKU ${selectedSizeSKU}.`
          );
          return prev; // no changes to cart
        }

        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id,
          baseSKU,
          name,
          size: selectedSize,
          sku: selectedSizeSKU,
          quantity: 1,
          availableQuantityInSize: selectedSizeQuantity,
          price: finalPrice,
          savingsPercentage: discountPercent,
          image,
          brand,
        },
      ];
    });
  }

  function handleRemoveCartItem(itemToRemove) {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === itemToRemove.id && item.sku === itemToRemove.sku)
      )
    );
  }

  useEffect(() => {
    console.log("[CartContext] Current cartItems:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("[CartContext] Current cartItems:", cartItems.length);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, handleAddToCart, handleRemoveCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

// This is a custom hook
export function useCart() {
  return useContext(CartContext);
}
