import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";

import ErrorBlock from "../components/ErrorBlock";

describe("ErrorBlock", () => {
  it("renders the error message", () => {
    const errorMessage = "An error occurred.";
    render(<ErrorBlock errorMessage={errorMessage} />);
    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the default error message if none is provided", () => {
    render(<ErrorBlock />);
    const messageElement = screen.getByText("Something went wrong.");
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the retry button", () => {
    const onClickRetry = jest.fn();
    render(<ErrorBlock onClickRetry={onClickRetry} />);
    const buttonElement = screen.getByRole("button", { name: "Retry" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClickRetry function when the retry button is clicked", () => {
    const onClickRetry = jest.fn();
    render(<ErrorBlock onClickRetry={onClickRetry} />);
    const buttonElement = screen.getByRole("button", { name: "Retry" });
    fireEvent.click(buttonElement);
    expect(onClickRetry).toHaveBeenCalled();
  });

  it("renders the loader when retryLoading is true", () => {
    render(<ErrorBlock retryLoading />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
