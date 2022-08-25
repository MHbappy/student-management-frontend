import { render, screen } from "@testing-library/react";
import SubmitBtn from './../components/common/SubmitBtn';


describe("SubmitBtn", () => {
  it("should render same text passed into label prop", () => {
    render(<SubmitBtn label="Form Submit" />);
    const buttonTitleElement = screen.getByText(/Form Submit/i);
    expect(buttonTitleElement).toBeInTheDocument();
  });
  it("Loading lable should be shown if the loading props is true", () => {
    render(<SubmitBtn label="Form Submit" loading />);
    const buttonTitleElement = screen.getByText(/Please wait.../i);
    expect(buttonTitleElement).toBeInTheDocument();
  });
  it("Button should be disabled when the loading props is true", () => {
    render(<SubmitBtn label="Form Submit" loading />);
    const buttonTitleElement = screen.getByRole('button')
    expect(buttonTitleElement).toHaveAttribute('disabled');
  });
  it("Should have type of submit", () => {
    render(<SubmitBtn label="Form Submit" loading />);
    const buttonTitleElement = screen.getByRole('button')
    expect(buttonTitleElement).toHaveAttribute('type', 'submit');
  });
});
