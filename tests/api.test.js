import { fetchInventory } from "../src/api/api.js";
import { inventory } from "../src/data/inventory";

test("fetchInventory returns the inventory data after delay", async () => {
  const data = await fetchInventory();
  expect(data).toEqual(inventory);
});
