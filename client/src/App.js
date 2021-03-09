import React, { Suspense } from "react";
import "./App.css";
import { UserProvider } from "./contexts/User";
import { CartProvider } from "./contexts/Cart";
import RoutesComponent from "./routes/RoutesComponent";
import Spinner from "./routes/CustomLoader/Spinner";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProvider>
        <CartProvider>
          <RoutesComponent />
        </CartProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
