import { render, screen } from "@testing-library/react";
import Contact from "../src/pages/Contact";

describe("Contact page", () => {
  test("renders main heading and description text", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /contact us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/got questions, compliments, or photos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/life's too short for boring pajamas/i)
    ).toBeInTheDocument();
  });

  test("renders image with correct alt text", () => {
    render(<Contact />);
    const img = screen.getByAltText(/a man in a kangaroo onesie/i);
    expect(img).toBeInTheDocument();
  });

  test("renders contact info sections", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByText(/support@funzy-onesies.com/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByText(/1-555-fun-ones/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /social media/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/instagram: @fun_onesies/i)).toBeInTheDocument();
  });
});
