import luksoModule from "@lukso/web3-onboard-config";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard, { OnboardAPI } from "@web3-onboard/core";
import { init } from "@web3-onboard/react";
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";

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

const wallets = [injected];

const chains = [
  {
    id: 1,
    token: "LYX",
    label: "LUKSO Mainnet",
    rpcUrl: "https://rpc.mainnet.lukso.network/",
  },
  {
    id: 2,
    token: "LYXt",
    label: "LUKSO Testnet",
    rpcUrl: "https://rpc.testnet.lukso.network",
  },
];

const appMetadata = {
  name: "Lukso Test dApp",
  description: "My test dApp using Onboard",
  recommendedInjectedWallets: [
    {
      name: "Universal Profiles",
      url: "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
    },
  ],
};

const connect: ConnectModalOptions = {
  iDontHaveAWalletLink:
    "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
  removeWhereIsMyWalletWarning: true,
};

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

let onboard: OnboardAPI;

const setupWeb3Onboard = async () => {
  onboard = Onboard({
    wallets,
    chains,
    appMetadata,
    connect,
  });


  const connectedWallets = await onboard.connectWallet();
  return connectedWallets[0];
};

const disconnect = async (): Promise<void> => {
  const [primaryWallet] = onboard.state.get().wallets;
  await onboard.disconnectWallet({ label: primaryWallet.label });
};

const setChainId = async (chainHex: string): Promise<void> => {
  await onboard.setChain({ chainId: chainHex });
};


// export default function useWeb3Onboard() {
//   return {
//     disconnect,
//     setChainId,
//     setupWeb3Onboard,
//   }
// }