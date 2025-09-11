import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import Dropdown from "../src/components/Dropdown";

test("renders button with default label", () => {
  vi.useFakeTimers(); // Make sure to call inside the test

  render(<Dropdown label="Pick one" options={["A", "B"]} />);
  expect(screen.getByRole("button")).toHaveTextContent("Pick one ▼");

  vi.useRealTimers(); // Reset to real timers after test
});

test("toggles dropdown list when button clicked", () => {
  vi.useFakeTimers(); // Ensure fake timers are enabled here as well

  render(<Dropdown label="Pick one" options={["A", "B"]} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByText("A")).toBeVisible();
  expect(screen.getByText("B")).toBeVisible();

  fireEvent.click(button);
  expect(screen.queryByText("A")).not.toBeInTheDocument();

  vi.useRealTimers(); // Reset after test
});

test("selects option and calls onSelect", () => {
  vi.useFakeTimers(); // Ensure fake timers are enabled for this test

  const onSelect = vi.fn();
  render(
    <Dropdown label="Pick one" options={["A", "B"]} onSelect={onSelect} />
  );

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText("B"));

  expect(onSelect).toHaveBeenCalledWith("B");
  expect(screen.getByRole("button")).toHaveTextContent("B ▼");

  // Dropdown should close after 3 seconds
  act(() => {
    vi.advanceTimersByTime(3000);
  });
  expect(screen.queryByText("A")).not.toBeInTheDocument();

  vi.useRealTimers(); // Reset after test
});
