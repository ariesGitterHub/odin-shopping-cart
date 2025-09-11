import { fetchInventory } from "../api/api";
import { inventory } from "../data/inventory";

test("fetchInventory returns the inventory data after delay", async () => {
  const data = await fetchInventory();
  expect(data).toEqual(inventory);
});
