// tests/NotFound.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../src/pages/NotFound";

describe("NotFound page", () => {
  test("renders 404 message and navigation link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Check heading
    expect(
      screen.getByRole("heading", { name: /404 page not found/i })
    ).toBeInTheDocument();

    // Check paragraph text with link
    expect(
      screen.getByText(/sorry, this page doesn't exist/i)
    ).toBeInTheDocument();
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Check image alt text
    expect(
      screen.getByAltText(/woman wearing a lion onesie strolls away/i)
    ).toBeInTheDocument();
  });
});
