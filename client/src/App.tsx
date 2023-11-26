import "cal-sans";
import { useEffect, useState } from "react";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bouties from "./pages/Bouties";
import { Toaster } from "react-hot-toast";
import Bounty from "./pages/Bounty";

import { Buffer } from "buffer";
import Avvvatars from "avvvatars-react";
import POW from "./pages/POW";
import { uploadData } from "./lib/lukso";
// @ts-ignore
window.Buffer = Buffer;

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [UP, setUP] = useState<any | null>(null);
  const [address, setAddress] = useState();
  let ethersProvider;
  if (wallet) {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
  }
  useEffect(() => {
    getUP();
    uploadData();
  }, [wallet]);

  const getUP = async () => {
    if (wallet?.accounts[0].address && !UP) {
      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        wallet?.accounts[0].address,
        "https://rpc.testnet.lukso.gateway.fm",
        {
          ipfsGateway: "https://api.universalprofile.cloud/ipfs",
        }
      );

      const profileMetaData = await erc725js.fetchData("LSP3Profile");

      //@ts-ignore
      setUP(profileMetaData.value?.LSP3Profile);
      //@ts-ignore
      setAddress(wallet?.accounts[0].address);

      console.log({
        //@ts-ignore
        UP: profileMetaData.value?.LSP3Profile,
        address: wallet?.accounts[0].address,
      });
    }
  };

  return (
    <div className="App dark">
      <Toaster />
      <Navbar
        UP={UP}
        address={address}
        connecting={connecting}
        wallet={wallet}
        connectWalletOnClick={() => (wallet ? disconnect(wallet) : connect())}
      />

      <div className="mt-[80px]">
        <h1 className="mt-8 text-white">{address}</h1>
        <Route path="/">
          <Home UP={UP} />
        </Route>
        <Route path="/bounty">
          <Bouties UP={UP} />
        </Route>
        <Route path="/bounty/:id">
          <Bounty UP={UP} />
        </Route>

        <Route path="/pow/:id">
          <POW />
        </Route>
      </div>
    </div>
  );
}

export default App;
