import { render, screen } from "@testing-library/react";
import About from "../src/pages/About";

describe("About page", () => {
  test("renders heading and descriptive text", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /about us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/comfort shouldn't come at the cost/i)
    ).toBeInTheDocument();
  });

  test("renders image with correct alt text", () => {
    render(<About />);
    const img = screen.getByAltText(/same woman wearing a koala onesie/i);
    expect(img).toBeInTheDocument();
  });
});
