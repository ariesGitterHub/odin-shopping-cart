import { render } from "@testing-library/react";
import Button from "../src/components/Button";
import styles from "../src/styles/Button.module.css"; // Import styles here

describe("Button component", () => {
  test("applies default variant class when no variant is given", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");

    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles.default); // Use styles.default instead of "default"
  });

  test("applies correct variant class", () => {
    const { container } = render(<Button variant="paypalButton">Pay</Button>);
    const button = container.querySelector("button");

    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles.paypalButton); // Use styles.paypalButton here
  });
});
