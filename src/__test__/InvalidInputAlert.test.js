import { render, screen } from "@testing-library/react";
import InvalidInputAlert from "../components/common/InvalidInputAlert";


describe("InvalidInputAlert", () => {
  it("should render same text passed into title prop", () => {
    render(<InvalidInputAlert error="This field is required" />);
    const titltElement = screen.getByText(/This field is required/i);
    expect(titltElement).toBeInTheDocument();
  });
  it("should not render any element if there is no props", () => {
    render(<InvalidInputAlert />);
    const titltElement = screen.queryByText(/This field is required/i);
    expect(titltElement).not.toBeInTheDocument();
  });
});
