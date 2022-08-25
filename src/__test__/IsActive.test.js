import { render, screen } from "@testing-library/react";
import IsActive from './../components/common/IsActive';

describe("IsActive", () => {
  it("should have text-success class if isActive props present", () => {
    render(<IsActive isActive />);
    const iElement = screen.getByTestId(/is-active-icon/i);
    expect(iElement).toHaveClass("text-success");
  });
  it("should have text-danger class if isActive props not present", () => {
    render(<IsActive  />);
    const iElement = screen.getByTestId(/is-active-icon/i);
    expect(iElement).toHaveClass("text-danger");
  });
});
