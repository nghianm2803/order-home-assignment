import { render, screen } from "@testing-library/react";
import OrderForm from "./components/OrderForm";

describe("Order form", () => {
  it("Renders create order form", () => {
    render(<OrderForm />);
    const linkElement = screen.getByText(/create order/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("Renders total amount field", () => {
    render(<OrderForm />);
    const linkElement = screen.getByText(/total amount/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("Renders consumer field", () => {
    render(<OrderForm />);
    const linkElement = screen.getByText(/consumer/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("Renders billing field", () => {
    render(<OrderForm />);
    const linkElement = screen.getByText(/billing/i);
    expect(linkElement).toBeInTheDocument();
  });
});
