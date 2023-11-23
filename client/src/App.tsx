import React from "react";
import "cal-sans";
import { Route } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useConnectWallet } from "@web3-onboard/react";
import web3Onboard from "./lib/web3-onboard";
import { Web3OnboardProvider } from "@web3-onboard/react";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  return (
    <div className="App">
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <Navbar
          connecting={connecting}
          wallet={wallet}
          connectWalletOnClick={() => (wallet ? disconnect(wallet) : connect())}
        />

        <div>
          <Route path="/">
            <Home />
          </Route>
        </div>
      </Web3OnboardProvider>
    </div>
  );
}

export default App;
