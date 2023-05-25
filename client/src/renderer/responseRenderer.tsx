import React from "react";
import { createRoot } from "react-dom/client";
import ResponseFrame from "@misc/window/components/ResponseFrame";
import Response from "@components/Response/Response";

// Say something
console.log("[ERWT] : Renderer execution started");

// Application to Render
const response = (
  <ResponseFrame title="ERWT Boilerplate" platform="windows">
    <Response />
  </ResponseFrame>
);

// Render application in DOM
createRoot(document.getElementById("response")).render(response);
