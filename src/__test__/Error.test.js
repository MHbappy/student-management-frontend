import { render, screen } from "@testing-library/react";
import Error from './../components/common/Error';

describe("Error", () => {
  it("should render same text passed into title prop", () => {
    render(<Error error="Internal server error" />);
    const titltElement = screen.getByText(/Internal server error/i);
    expect(titltElement).toBeInTheDocument();
  });
});
