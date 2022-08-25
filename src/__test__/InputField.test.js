import { fireEvent, render, screen } from "@testing-library/react";
import InputField from './../components/common/InputField';


describe("InputField", () => {
  it("should render input element by placeholder", () => {
    render(<InputField placeholder="First name" />);
    const inputElement = screen.getByPlaceholderText(/First name/i);
    expect(inputElement).toBeInTheDocument();
  });
  it("should be able to type", () => {
    render(<InputField placeholder="First name" />);
    const inputElement = screen.getByPlaceholderText(/First name/i);
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "John" } })
    expect(inputElement.value).toBe("John");
  });
});
