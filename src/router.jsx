import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // Correct import with proper file path
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Create the router with routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the layout wrapper component
    errorElement: <NotFound />, // 404 page for undefined routes
    children: [
      { index: true, element: <Home /> }, // Home page
      { path: "shop", element: <Shop /> }, // Contact page
      { path: "about", element: <About /> }, // About page
      { path: "contact", element: <Contact /> }, // Contact page
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
]);
