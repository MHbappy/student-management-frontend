import React, { useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AssignRoutes = ({ routes = [] }) => {
  const arr = useMemo(() => routes, [routes]);
  return (
    <Switch>
      {arr.map((r) =>
        r.auth ? (
          <ProtectedRoute
            key={r.path}
            path={r.path}
            exact
            component={r.component}
          />
        ) : (
          <Route key={r.path} path={r.path} exact component={r.component} />
        )
      )}
      <Redirect to="/" />
    </Switch>
  );
};

export default AssignRoutes;
