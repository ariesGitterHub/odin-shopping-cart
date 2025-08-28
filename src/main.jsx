// Streictmode commented out to test number count accuracy with cart and CartContext
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);
