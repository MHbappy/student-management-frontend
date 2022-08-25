import { render, screen } from "@testing-library/react";
import Title from './../components/common/Title';


describe("Title", () => {
  it("should render same text passed into title prop", () => {
    render(<Title title="Create a new department" />);
    const titleElement = screen.getByText(/Create a new department/i);
    expect(titleElement).toBeInTheDocument();
  });
});
