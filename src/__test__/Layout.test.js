import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./../components/common/Layout";
import withContext from "./../helper/hoc/withContext";

const MockLayout = withContext(({ children }) => (
  <BrowserRouter>
    <Layout>{children}</Layout>
  </BrowserRouter>
));

describe("Layout", () => {
  it("should have header component", () => {
    render(<MockLayout />);
    const headerElement = screen.getByTestId(/header/i);
    expect(headerElement).toBeInTheDocument();
  });
  it("should have sidebar component", () => {
    render(<MockLayout />);
    const headerElement = screen.getByTestId(/sidebar/i);
    expect(headerElement).toBeInTheDocument();
  });
  it("should render the children component", () => {
    render(
      <MockLayout>
        <h1>Hello World</h1>
      </MockLayout>
    );
    const childrenElement = screen.getByText(/Hello World/i);
    expect(childrenElement).toBeInTheDocument();
  });
});
