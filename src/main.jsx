import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import "./styles/tokens.css";
import "./styles/components.css";
import "./styles/cinematic.css";
import "./styles/universe-home.css";
import "./styles/world-experience.css";
import "./styles/artwork-quality.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
