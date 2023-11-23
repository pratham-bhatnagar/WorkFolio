import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import web3Onboard from "./lib/web3-onboard";
import { Web3OnboardProvider } from "@web3-onboard/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  </React.StrictMode>
);
