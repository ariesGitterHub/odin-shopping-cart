import { render, screen, fireEvent } from "@testing-library/react";
import Searchbar from "../src/components/Searchbar";

vi.useFakeTimers();

describe("Searchbar component", () => {
  it("renders input and calls onSearch after debounce", () => {
    const onSearchMock = vi.fn();

    render(<Searchbar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search by animal/i);

    // Simulate typing
    fireEvent.change(input, { target: { value: "lion" } });

    // At this point, onSearch should not have been called immediately
    expect(onSearchMock).not.toHaveBeenCalled();

    // Fast-forward time by 300ms (debounce delay)
    vi.advanceTimersByTime(300);

    // Now onSearch should have been called once with "lion"
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("lion");
  });

  it("debounces multiple quick inputs and calls onSearch only once with latest value", () => {
    const onSearchMock = vi.fn();

    render(<Searchbar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search by animal/i);

    // Simulate rapid typing
    fireEvent.change(input, { target: { value: "l" } });
    vi.advanceTimersByTime(100); // 100ms passed, not yet 300ms
    fireEvent.change(input, { target: { value: "li" } });
    vi.advanceTimersByTime(100); // 200ms total, still not 300ms after last input
    fireEvent.change(input, { target: { value: "lio" } });
    vi.advanceTimersByTime(100); // 300ms total but last input was 100ms ago, so debounce resets
    fireEvent.change(input, { target: { value: "lion" } });

    // Before 300ms debounce completes, onSearch should not be called
    expect(onSearchMock).not.toHaveBeenCalled();

    // Advance time to trigger debounce for last input
    vi.advanceTimersByTime(300);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("lion");
  });
});
