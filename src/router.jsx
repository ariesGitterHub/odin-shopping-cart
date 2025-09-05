import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ShoppingCart from "./pages/ShoppingCart";

// Create the router with routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout wrapper component
    errorElement: <NotFound />, // 404 page for undefined routes
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "shopping-cart", element: <ShoppingCart /> },
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
]);
