import { useState } from "react";
import { Outlet } from "react-router-dom";
import { inventory } from "./data/inventory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("");


    const onesies = inventory.map((product) => {
      const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
      const sizes = product.stock
        .filter((item) => item.quantity > 0)
        .map((item) => item.size);

      return {
        ...product,
        currentTotalStockNumber: total,
        availableSizes: sizes,
      };
    });

const filteredProducts = onesies.filter((product) => {
  const searchLower = searchQuery.toLowerCase(); // Lowercase the search query for case-insensitive matching

  // Check if animalType or any of the tags match the search query
  return (
    product.animalType.toLowerCase().includes(searchLower) ||
    product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
});


  return (
    <div>
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <main>
        <Outlet context={{ 
          filteredProducts, 
          onesies }} />
      </main>
      <Footer />
    </div>
  );
}
