import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";

// Prevent browser from auto-restoring scroll positions on navigation,
// which interferes with hash-based section scrolling.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
