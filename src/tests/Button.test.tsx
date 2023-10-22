import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../components/Button";

describe("Button", () => {
  it("renders a button with the provided text", () => {
    const buttonText = "Click me!";
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me!</Button>);
    const buttonElement = screen.getByText("Click me!");
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });

  it("disables the button when disabled prop is true", () => {
    render(<Button disabled>Click me!</Button>);
    const buttonElement = screen.getByText("Click me!");
    expect(buttonElement).toBeDisabled();
  });
});
