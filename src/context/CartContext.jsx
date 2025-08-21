import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart({ id, name, size, finalPrice, image, brand }) {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id,
          name,
          size,
          quantity: 1,
          price: finalPrice,
          image,
          brand,
        },
      ];
    });
  }

  useEffect(() => {
    console.log("[CartContext] Current cartItems:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// custom hook
export function useCart() {
  return useContext(CartContext);
}
