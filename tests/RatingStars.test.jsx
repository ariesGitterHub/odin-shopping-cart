import { render, screen } from "@testing-library/react";
import RatingStars from "../utils/RatingStars"; // Adjust the path as needed

describe("RatingStars", () => {
  it("renders 5 full stars for rating 5", () => {
    render(<RatingStars rating={5} />);
    const fullStars = screen.getAllByAltText("Full star");
    expect(fullStars.length).toBe(5);
    expect(screen.queryByAltText("Half star")).toBeNull();
    expect(screen.queryByAltText("Empty star")).toBeNull();
  });

  it("renders full and half stars correctly for 3.5 rating", () => {
    render(<RatingStars rating={3.5} />);
    expect(screen.getAllByAltText("Full star").length).toBe(3);
    expect(screen.getByAltText("Half star")).toBeInTheDocument();
    expect(screen.getAllByAltText("Empty star").length).toBe(1);
  });

  it("renders full and empty stars for 4 rating", () => {
    render(<RatingStars rating={4} />);
    expect(screen.getAllByAltText("Full star").length).toBe(4);
    expect(screen.queryByAltText("Half star")).toBeNull();
    expect(screen.getAllByAltText("Empty star").length).toBe(1);
  });

  it("renders no full stars, only empty stars for rating 0", () => {
    render(<RatingStars rating={0} />);
    expect(screen.queryByAltText("Full star")).toBeNull();
    expect(screen.queryByAltText("Half star")).toBeNull();
    expect(screen.getAllByAltText("Empty star").length).toBe(5);
  });

  it("renders half star only when decimal is >= 0.5", () => {
    render(<RatingStars rating={2.49} />);
    expect(screen.getAllByAltText("Full star").length).toBe(2);
    expect(screen.queryByAltText("Half star")).toBeNull();
  });
});
