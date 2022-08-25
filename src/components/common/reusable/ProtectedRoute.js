/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { Redirect, Route } from "react-router-dom";
import { IS_LOGIN } from "../../../constants/APP_INFO";
import withLayout from "../../../helper/hoc/withLayout";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        IS_LOGIN ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default withLayout(ProtectedRoute);
