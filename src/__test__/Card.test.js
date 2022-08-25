import { render, screen } from "@testing-library/react";
import Card from "./../components/common/Card";

describe("Card", () => {
  it("should render the children component", () => {
    render(
      <Card>
        <h1>Hello World</h1>
      </Card>
    );
    const childrenElement = screen.getByText(/Hello World/i);
    expect(childrenElement).toBeInTheDocument();
  });
});
