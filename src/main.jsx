import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import "./index.css";
import { VideoProvider } from "./contexts/VideoContext.jsx";
import { AccountsProvider } from "./contexts/AccountsContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AccountsProvider>
        <VideoProvider>
          <App />
        </VideoProvider>
      </AccountsProvider>
    </BrowserRouter>
  </StrictMode>
);
