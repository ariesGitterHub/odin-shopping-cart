import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import Dropdown from "../src/components/Dropdown";

vi.useFakeTimers();

test("renders button with default label", () => {
  render(<Dropdown label="Pick one" options={["A", "B"]} />);
  expect(screen.getByRole("button")).toHaveTextContent("Pick one ▼");
});

test("toggles dropdown list when button clicked", () => {
  render(<Dropdown label="Pick one" options={["A", "B"]} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByText("A")).toBeVisible();
  expect(screen.getByText("B")).toBeVisible();

  fireEvent.click(button);
  expect(screen.queryByText("A")).not.toBeInTheDocument();
});

test("selects option and calls onSelect", () => {
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
});

vi.useRealTimers();
