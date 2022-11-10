import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  ...props
}) => {
  return (
   <Route>
      {() =>
        props.isLogged ? <Component {...props} /> : <Redirect to="/sign-up" />
      }
    </Route>
)};

export default ProtectedRoute;
