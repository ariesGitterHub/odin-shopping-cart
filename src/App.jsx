import { Outlet } from "react-router-dom";
import { inventory } from "./data/inventory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {
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
  return (
    <div>
      <Navbar />
      <main>
        <Outlet context={{ onesies }} />
      </main>
      <Footer />
    </div>
  );
}
