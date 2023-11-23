import "cal-sans";
import { useEffect, useState } from "react";
import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import Bouties from "./pages/Bouties";
import { Toaster } from "react-hot-toast";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [account, setAccount] = useState<string | null>(null);
  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
  }

  useEffect(() => {
    getAccounts();
  }, [wallet]);

  const getAccounts = async () => {
    if (wallet && !account) {
      //@ts-ignore
    }
  };

  return (
    <div className="App dark">
      <Toaster />
      <Navbar
        connecting={connecting}
        wallet={wallet}
        connectWalletOnClick={() => (wallet ? disconnect(wallet) : connect())}
      />

      <div>
        <h1 className="mt-[80px]">{account}</h1>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/bounty">
          <Bouties />
        </Route>
      </div>
    </div>
  );
}

export default App;
