import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { inventory } from "./data/inventory";
import { fetchInventory } from "./api/api"; // Import the mock API function

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryData, setInventoryData] = useState([]); // State for holding the inventory
  const [loading, setLoading] = useState(true); // State to track loading status

  // const [cartItems, setCartItems] = useState([]);


  // const onesies = inventory.map((product) => {
  //   const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
  //   const sizes = product.stock
  //     .filter((item) => item.quantity > 0)
  //     .map((item) => item.size);

  //   return {
  //     ...product,
  //     currentTotalStockNumber: total,
  //     availableSizes: sizes,
  //   };
  // });

  // const filteredProducts = onesies.filter((product) => {
  //   const searchLower = searchQuery.toLowerCase(); // Lowercase the search query for case-insensitive matching

  //   // Check if animalType or any of the tags match the search query
  //   return (
  //     product.animalType.toLowerCase().includes(searchLower) ||
  //     product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  //   );
  // });

  
  useEffect(() => {
    // Simulate fetching the inventory data
    fetchInventory().then((data) => {
      setInventoryData(data); // Set the inventory data once it's "fetched"
      setLoading(false); // Set loading to false when data is fetched
    });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Create enriched onesies data from inventoryData (if it's available)
  const onesies = inventoryData.map((product) => {
    const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
    const sizes = product.stock
      .filter((item) => item.quantity > 0)
      .map((item) => item.size);
    // START CHANGES...
        const quantities = product.stock
          .filter((item) => item.quantity > 0)
          .map((item) => item.quantity);
        const skus = product.stock
          .filter((item) => item.quantity > 0)
          .map((item) => item.sku);
//END CHANGES
    return {
      ...product,
      currentTotalStockNumber: total,
      availableSizes: sizes,
      availableQuantities: quantities,
      availableSKUs: skus,
    };
  });

  // Filter onesies based on the search query
  const filteredProducts = onesies.filter((product) => {
    const searchLower = searchQuery.toLowerCase(); // Lowercase search query for case-insensitive matching

    // Check if animalType or any of the tags match the search query
    return (
      product.animalType.toLowerCase().includes(searchLower) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  // If the data is still loading, display a loading indicator
  if (loading) {
    return <div className="loading-msg-div">Loading...</div>;
  }

  return (
    <div>
      <CartProvider>
        <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
        <main>
          {/* <CartProvider> */}
          <Outlet
            context={{
              filteredProducts,
              //onesies
            }}
          />
          {/* </CartProvider> */}
        </main>
        <Footer />
      </CartProvider>
    </div>
  );
}
