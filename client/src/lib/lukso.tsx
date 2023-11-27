import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { removeIpfsPrefix } from "./utils";
import { LSPFactory, ProfileDataBeforeUpload } from "@lukso/lsp-factory.js";
import { LSP8IdentifiableDigitalAssetDeploymentOptions } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/digital-asset-deployment";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import Web3, { EIP1193Provider } from "web3";

export const DEFAULT_GAS = "500_000";
export const DEFAULT_GAS_PRICE = "10000000000";

//@ts-ignore
const web3 = new Web3(window.lukso);
const provider = "https://rpc.testnet.lukso.network";

export const getUP = async (address: any) => {
  const erc725js = new ERC725(
    //@ts-ignore
    lsp3ProfileSchema as ERC725JSONSchema[],
    address,
    "https://rpc.testnet.lukso.gateway.fm",
    {
      ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    }
  );

  const profileMetaData = await erc725js.fetchData("LSP3Profile");
  //@ts-ignore
  return profileMetaData.value?.LSP3Profile;
};

export const getIPFSPublic = (ipfs: any) => {
  return `https://api.universalprofile.cloud/ipfs/${removeIpfsPrefix(ipfs)}`;
};

export const uploadData = async (github: string, wallet: any) => {
  const lspFactory = new LSPFactory(
    wallet?.provider as EIP1193Provider<"https://rpc.testnet.lukso.network">,
    {
      chainId: 4201, // Chain Id of the network you want to deploy to
    }
  );

  let profileData: ProfileDataBeforeUpload = {
    name: "",
    description: "",
    links: [{ title: "github", url: `www.github.com/${github}` }],
  };
  const uploadResult = await lspFactory.UniversalProfile.uploadProfileData(
    profileData
  );
  const lsp3ProfileIPFSUrl = uploadResult.url;
  console.log(lsp3ProfileIPFSUrl);

  const schema: ERC725JSONSchema = {
    name: "LSP3Profile",
    key: "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    keyType: "Singleton",
    valueContent: "JSONURL",
    valueType: "bytes",
  };

  const erc725 = new ERC725([schema], wallet?.accounts[0].address, provider, {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  });

  const data = erc725.encodeData([
    {
      keyName: "LSP3Profile",
      value: {
        verification: {
          method: "keccak256(utf8)",
          data: Web3.utils.keccak256(JSON.stringify(uploadResult.json)),
        },

        url: lsp3ProfileIPFSUrl,
      },
    },
  ]);

  const universalProfileContract = new web3.eth.Contract(
    UniversalProfile.abi,
    wallet?.accounts[0].address,
    {
      gas: DEFAULT_GAS,
      gasPrice: DEFAULT_GAS_PRICE,
    }
  );

  console.log(data);
  console.log({ key: data.keys[0], val: data.values[0] });

  await universalProfileContract.methods
    //@ts-ignore
    .setDataBatch([ERC725.encodeKeyName("github")], [data.values[0]])
    // my universal ID
    .send({ from: wallet?.accounts[0].address })
    .on("receipt", function (receipt: any) {
      console.log(receipt);
    })
    .once("sending", (payload: any) => {
      console.log(JSON.stringify(payload, null, 2));
    });
};

export const CreateBounty = async (
  wallet: any,
  title: string,
  desc: string
) => {
  const lspFactory = new LSPFactory(
    wallet?.provider as EIP1193Provider<"https://rpc.testnet.lukso.network">,
    {
      chainId: 4201, // Chain Id of the network you want to deploy to
    }
  );

  const digitalAssetData: LSP8IdentifiableDigitalAssetDeploymentOptions = {
    controllerAddress: wallet?.accounts[0].address,
    name: desc,
    symbol: `${title}`,
    creators: [wallet?.accounts[0].address],
    tokenIdType: "",
  };
  try {
    const deployedAsset = await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
      digitalAssetData
    );

    console.log("Deployed asset", deployedAsset.LSP8IdentifiableDigitalAsset);
  } catch (err) {
    console.log("====> Error", err);
  }
};

export const ClaimWinnerNFT = async (wallet: any, title: string) => {
  const lspFactory = new LSPFactory(
    wallet?.provider as EIP1193Provider<"https://rpc.testnet.lukso.network">,
    {
      chainId: 4201,
    }
  );

  const digitalAssetData: LSP8IdentifiableDigitalAssetDeploymentOptions = {
    controllerAddress: wallet?.accounts[0].address,
    name: title,
    symbol: `Winner NFT`,
    creators: [wallet?.accounts[0].address],
    tokenIdType: "",
  };
  try {
    const deployedAsset = await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
      digitalAssetData
    );

    console.log("Deployed asset", deployedAsset.LSP8IdentifiableDigitalAsset);
  } catch (err) {
    console.log("====> Error", err);
  }
};
