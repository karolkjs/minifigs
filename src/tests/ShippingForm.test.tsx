import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import ShippingForm from "../components/ShippingForm";

describe("ShippingForm", () => {
  const onSubmitMock = jest.fn();
  const setShowModalMock = jest.fn();
  const setPartsMock = jest.fn();

  const cartState = {
    name: "Fig 1",
    set_num: "1234",
    set_img_url: "https://example.com/fig1.jpg",
    num_parts: 10,
    parts: [],
    set_url: "test",
    last_modified_dt: Date.now().toString(),
  };

  beforeEach(() => {
    onSubmitMock.mockClear();
    setShowModalMock.mockClear();
    setPartsMock.mockClear();
  });

  it("renders the form inputs", () => {
    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("Zip Code")).toBeInTheDocument();
  });

  it("renders the cart summary", () => {
    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    expect(screen.getByText("Cart Summary")).toBeInTheDocument();
    expect(screen.getByText(cartState.name)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the show details button", () => {
    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    expect(screen.getByText("Show Details")).toBeInTheDocument();
  });

  it("opens the modal when the show details button is clicked", () => {
    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    const showDetailsButton = screen.getByText("Show Details");
    fireEvent.click(showDetailsButton);

    expect(setShowModalMock).toHaveBeenCalledWith(true);
  });

  it("submits the form when all fields are filled out", async () => {
    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    const surnameInput = screen.getByLabelText("Surname");
    const phoneInput = screen.getByLabelText("Phone Number");
    const emailInput = screen.getByLabelText("Email");
    const addressInput = screen.getByLabelText("Address");
    const cityInput = screen.getByLabelText("City");
    const stateInput = screen.getByLabelText("State");
    const zipInput = screen.getByLabelText("Zip Code");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      userEvent.type(nameInput, "John");
      userEvent.type(surnameInput, "Doe");
      userEvent.type(phoneInput, "1234567890");
      userEvent.type(emailInput, "john.doe@example.com");
      userEvent.type(addressInput, "123 Main St");
      userEvent.type(cityInput, "Anytown");
      userEvent.type(stateInput, "CA");
      userEvent.type(zipInput, "12345");
      fireEvent.click(submitButton);
      await waitFor(() =>
        expect(onSubmitMock).toHaveBeenCalledWith({
          name: "John",
          surname: "Doe",
          phone_number: "1234567890",
          email: "john.doe@example.com",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip_code: "12345",
        })
      );
    });
  });

  it("displays an error message when the form submission fails", async () => {
    onSubmitMock.mockRejectedValueOnce(new Error("Submission failed"));

    render(
      <ShippingForm
        onSubmit={onSubmitMock}
        setShowModal={setShowModalMock}
        setParts={setPartsMock}
        cartState={cartState}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    const submitButton = screen.getByText("Submit");

    await act(async () => {
      userEvent.type(nameInput, "John");
      fireEvent.click(submitButton);
      await waitFor(() =>
        expect(screen.getByText("Something went wrong.")).toBeInTheDocument()
      );
    });
  });
});
