import luksoModule from "@lukso/web3-onboard-config";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const lukso = luksoModule();

const injected = injectedModule({
  custom: [lukso],
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      if (wallet.label === "Universal Profiles") {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },
  displayUnavailable: ["Universal Profiles"],
});

export default init({
  // An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet.
  wallets: [injected],
  // An array of Chains that your app supports
  chains: [
    {
      id: 1,
      token: "LYX",
      label: "LUKSO Mainnet",
      rpcUrl: "https://rpc.lukso.gateway.fm/",
    },
    {
      id: 2,
      token: "LYXt",
      label: "LUKSO Testnet",
      rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
    },
  ],
  appMetadata: {
    name: "Dev Launchpad",
    // SVG icon string, with height or width (whichever is larger) set to 100% or a valid image URL
    icon: "<svg></svg>",
    // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
    logo: "<svg></svg>",
    // The description of your app
    description: "Demo app for Onboard V2",
  },
});
