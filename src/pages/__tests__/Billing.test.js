/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

import Billing from "../Billing";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";

// it("renders without crashing", async () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Billing />, div);
// });

// beforeEach(() => {
//   render(<Billing />);
// });

/* it("renders", () => {
  const { asFragment } = render(<Billing />);
  expect(asFragment()).toMatchSnapshot();
}); */

// describe("main inputs", () => {
//   it("renders inputs blank initially", () => {
//     expect(screen.getByPlaceholderText("Pick a date")).toHaveValue("");
//   });

//   it("sets select value as blank", () => {
//     expect(screen.getByRole("combobox").value).toEqual("");
//   });

// });

describe("add/remove form", () => {
  it("click triggers error", () => {
    const onSubmit = jest.fn();
    const { queryByText } = render(<Billing />);
    const addButton = queryByText("ADD");
    fireEvent.click(addButton);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("shows error messages properly", async () => {
    const { queryByText, getByText } = render(<Billing />);
    const addButton = queryByText("ADD");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(getByText("Enter product name")).toBeInTheDocument(),
        expect(getByText("Enter amount")).toBeInTheDocument(),
        expect(getByText("Enter price")).toBeInTheDocument();
    });
  });

  it("renders amount and price input as number type", async () => {
    const { getByPlaceholderText } = render(<Billing />);
    const amountInput = getByPlaceholderText("Amount");
    const priceInput = getByPlaceholderText("Price");

    fireEvent.change(amountInput, { target: { value: "Text" } });
    fireEvent.change(priceInput, { target: { value: "Text" } });
    expect(amountInput).toHaveValue(null);
    expect(priceInput).toHaveValue(null);
  });

  it("submits if validation passes", async () => {
    const { queryByText, getByPlaceholderText, getByText } = render(
      <Billing />
    );
    const addButton = queryByText("ADD");
    const productInput = getByPlaceholderText("Product");
    const amountInput = getByPlaceholderText("Amount");
    const priceInput = getByPlaceholderText("Price");

    await waitFor(() => {
      fireEvent.change(productInput, { target: { value: "Some product" } });
      fireEvent.change(amountInput, { target: { value: 23 } });
      fireEvent.change(priceInput, { target: { value: 100 } });
    });

    await waitFor(() => fireEvent.click(addButton));

    await waitFor(() => {
      expect(getByText("Some product")).toBeInTheDocument(),
        expect(getByText(23)).toBeInTheDocument(),
        expect(getByText("£100.00")).toBeInTheDocument(),
        expect(getByText(/£2,300.00/)).toBeVisible;
    });
  });
});
