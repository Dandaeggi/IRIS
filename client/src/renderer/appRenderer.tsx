// appRenderer.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import WindowFrame from "@misc/window/components/WindowFrame";
import Application from "@components/Application";

// Say something
console.log("[ERWT] : Renderer execution started");

// Application to Render
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WindowFrame title="iris" platform="windows">
        <Application />
      </WindowFrame>
    </PersistGate>
  </Provider>
);

// Render application in DOM
createRoot(document.getElementById("app")).render(app);
