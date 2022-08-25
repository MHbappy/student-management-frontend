import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const withLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <Header />
        <Sidebar />
        <main id="main">
          <Component {...props} />
        </main>
      </>
    );
  };

export default withLayout;
