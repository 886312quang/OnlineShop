import React, { Suspense, useEffect } from "react";
import "./App.css";
import { CartProvider } from "./contexts/Cart";
import { UserProvider } from "./contexts/User";
import { ChatProvider } from "./contexts/Chat";
import Spinner from "./routes/CustomLoader/Spinner";
import RoutesComponent from "./routes/RoutesComponent";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProvider>
        <CartProvider>
          <ChatProvider>
            <RoutesComponent />
          </ChatProvider>
        </CartProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
