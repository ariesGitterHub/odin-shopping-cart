// api.js or inventory.js
import { inventory } from "../data/inventory"; // Import your static inventory data

// Simulate a delay like a real API call (e.g., 1 second)
export const fetchInventory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inventory); // Resolve the promise with the inventory data after a delay
    }, 1000); // 1 second delay
  });
};
