import "cal-sans";
import { useEffect } from "react";
import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    // if using ethers v6 this is:
    ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
  }
  useEffect(() => {
    console.log({ wallet, connecting });
  }, [wallet, connecting]);
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
