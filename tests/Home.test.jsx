// tests/Home.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/pages/Home";

describe("Home page", () => {
  test("renders welcome message, image link, and CTA text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /funzy onesies!/i })
    ).toBeInTheDocument();

    const img = screen.getByAltText(
      /woman wearing a green frog onesie at home/i
    );
    expect(img).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/shop");
    expect(link).toContainElement(img);

    expect(
      screen.getByText(/click above to start shopping!/i)
    ).toBeInTheDocument();
  });
});
