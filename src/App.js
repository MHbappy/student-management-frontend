/* eslint-disable jsx-a11y/anchor-is-valid */

import ErrorBoundaryWrapper from "./components/common/reusable/ErrorBoundaryWrapper";
import StartupScreen from "./containers/StartupScreen";
import withContext from "./helper/hoc/withContext";

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <StartupScreen />
    </ErrorBoundaryWrapper>
  );
};

export default withContext(App);
