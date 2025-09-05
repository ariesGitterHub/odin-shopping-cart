import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "../src/components/Modal";

const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

test("renders with initial image", () => {
  render(<Modal images={images} currentIndex={1} onClose={vi.fn()} />);
  expect(screen.getByRole("img")).toHaveAttribute("src", "img2.jpg");
});

test("clicking close button calls onClose", () => {
  const onClose = vi.fn();
  render(<Modal images={images} currentIndex={0} onClose={onClose} />);
  fireEvent.click(screen.getByText("×"));
  expect(onClose).toHaveBeenCalled();
});

test("next and prev buttons cycle images", () => {
  render(<Modal images={images} currentIndex={0} onClose={vi.fn()} />);
  const nextButton = screen.getByText("›");
  const prevButton = screen.getByText("‹");
  const img = screen.getByRole("img");

  // Initially img1.jpg
  expect(img).toHaveAttribute("src", "img1.jpg");

  fireEvent.click(nextButton);
  expect(img).toHaveAttribute("src", "img2.jpg");

  fireEvent.click(nextButton);
  expect(img).toHaveAttribute("src", "img3.jpg");

  fireEvent.click(nextButton); // wraps around
  expect(img).toHaveAttribute("src", "img1.jpg");

  fireEvent.click(prevButton); // wraps to last
  expect(img).toHaveAttribute("src", "img3.jpg");
});

test("keyboard events trigger expected behavior", () => {
  const onClose = vi.fn();
  render(<Modal images={images} currentIndex={0} onClose={onClose} />);

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "img1.jpg");

  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(img).toHaveAttribute("src", "img2.jpg");

  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(img).toHaveAttribute("src", "img1.jpg");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(onClose).toHaveBeenCalled();
});
