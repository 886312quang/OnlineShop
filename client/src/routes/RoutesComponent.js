import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import PublicRoute from "./PublicRoute";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import CustomLoadable from "./CustomLoader/CustomLoadable";
import OpenChatBtn from "../components/LiveChat/OpenChatBtn";
import AdminRoute from "./AdminRoute";

const NotFound = () => import("../pages/Errors/Error404Page");

const RoutesComponent = () => (
  <Router>
    <Switch>
      {routes.publicRoutes.map((route) => (
        <PublicRoute
          key={route.path}
          exact
          path={route.path}
          component={CustomLoadable({ loader: route.loader })}
        />
      ))}

      {routes.privateRoutes.map((route) => (
        <PrivateRoute
          key={route.path}
          path={route.path}
          component={CustomLoadable({ loader: route.loader })}
          exact={!!route.exact}
        />
      ))}

      {routes.adminRoutes.map((route) => (
        <AdminRoute
          key={route.path}
          path={route.path}
          component={CustomLoadable({ loader: route.loader })}
          exact={!!route.exact}
        />
      ))}

      {routes.authRoutes.map((route) => (
        <AuthRoute
          key={route.path}
          exact
          path={route.path}
          component={CustomLoadable({ loader: route.loader })}
        />
      ))}

      {routes.errorRoutes.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={CustomLoadable({ loader: route.loader })}
        />
      ))}

      <Route component={CustomLoadable({ loader: NotFound })} />
    </Switch>
    <OpenChatBtn />
  </Router>
);

export default RoutesComponent;
