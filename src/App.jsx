import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navigation component
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />{" "}
        {/* Render the child route's component here/Nested routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
}
