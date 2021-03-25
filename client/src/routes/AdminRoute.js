import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { authorize } from "../services/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [role, setRole] = useState(true);

  const checkRole = async () => {
    try {
      let role = await authorize();
      if (role.data === "admin") {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function role() {
      setRole(await checkRole());
    }

    role();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        role ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
