import React, { Suspense } from "react";
import "./App.css";
import { UserProvider } from "./contexts/User";
import RoutesComponent from "./routes/RoutesComponent";
import Spinner from "./routes/CustomLoader/Spinner";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProvider>
        <RoutesComponent />
      </UserProvider>
    </Suspense>
  );
}

export default App;
