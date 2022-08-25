import { render, screen } from "@testing-library/react";
import Form from './../components/common/Form';

describe("Form", () => {
  it("should render same text passed into title prop", () => {
    render(<Form title="Create a new department" />);
    const titleElement = screen.getByText(/Create a new department/i);
    expect(titleElement).toBeInTheDocument();
  });
  it("should render error message if error peops if present", () => {
    render(<Form formError="Internal server error" />);
    const titltElement = screen.getByText(/Internal server error/i);
    expect(titltElement).toBeInTheDocument();
  });
  it("should render same text on submit button passed into label prop", () => {
    render(<Form label="Form Submit" />);
    const buttonTitleElement = screen.getByText(/Form Submit/i);
    expect(buttonTitleElement).toBeInTheDocument();
  });
  it("Loading lable should be shown if the loading props is true", () => {
    render(<Form label="Form Submit" formLoading />);
    const buttonTitleElement = screen.getByText(/Please wait.../i);
    expect(buttonTitleElement).toBeInTheDocument();
  });

  it("Form should have type of submit button", () => {
    render(<Form label="Form Submit" loading />);
    const buttonTitleElement = screen.getByRole("button");
    expect(buttonTitleElement).toHaveAttribute("type", "submit");
  });
  it("Form button should be disabled when the formLoading props is true", () => {
    render(<Form label="Form Submit" formLoading />);
    const buttonTitleElement = screen.getByRole("button");
    expect(buttonTitleElement).toHaveAttribute("disabled");
  });
});
