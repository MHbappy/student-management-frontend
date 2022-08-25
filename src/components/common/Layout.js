import Header from "../header/Header";
import Sidebar from "./../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" data-testid="main">{children}</main>
    </>
  );
};

export default Layout;
