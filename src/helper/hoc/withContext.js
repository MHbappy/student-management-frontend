import AppProvider from "../../context";

const withContext =
  (Component) =>
  ({ ...props }) => {
    return (
      <AppProvider>
        <Component {...props} />
      </AppProvider>
    );
  };
export default withContext;
