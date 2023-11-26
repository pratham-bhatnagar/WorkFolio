import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { removeIpfsPrefix } from "./utils";
import { UploadOptions } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/profile-upload-options";
import { hexlify, keccak256 } from "ethers";
import { ProfileDataForEncoding } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/lsp3-profile";
import {
  DeployedUniversalProfileContracts,
  LSPFactory,
  ContractDeploymentOptions,
  ProfileDataBeforeUpload,
  ProfileDeploymentOptions,
} from "@lukso/lsp-factory.js";

import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import Web3 from "web3";



export const DEFAULT_GAS = "5_000_000";
export const DEFAULT_GAS_PRICE = "10000000000";
//@ts-ignore
const web3 = new Web3(window.lukso);
const provider = "https://rpc.testnet.lukso.network";

const lspFactory = new LSPFactory("https://rpc.testnet.lukso.network", {
  chainId: 4201, // Chain Id of the network you want to deploy to
});

let profileData: ProfileDataBeforeUpload = {
  name: "",
  description: "",
  links: [{ title: "Twiiter", url: "www.twitter.com/prrthamm" }],
};

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
}
const uploadUniversalProfileMetaData = async (
  profileData: ProfileDataBeforeUpload,
  uploadOptions?: UploadOptions
): Promise<ProfileDataForEncoding> => {
  return await lspFactory.UniversalProfile.uploadProfileData(
    profileData,
    uploadOptions
  );
};

export const uploadData = async () => {
  const uploadResult = await lspFactory.UniversalProfile.uploadProfileData(
    profileData
  );
  const lsp3ProfileIPFSUrl = uploadResult.url;
  const jsonfile = uploadResult.json;
  console.log({ sss: uploadResult.json.LSP3Profile });
  console.log(lsp3ProfileIPFSUrl);

  // console.log(uploadResult)

  const schema: ERC725JSONSchema = {
    name: "LSP3Profile",
    key: "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    keyType: "Singleton",
    valueContent: "JSONURL",
    valueType: "bytes",
  };

  const erc725 = new ERC725(
    [schema],
    "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
    provider,
    {
      ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    }
  );

  const daata = erc725.encodeData([
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
    "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
    {
      gas: DEFAULT_GAS,
      gasPrice: DEFAULT_GAS_PRICE,
    }
  );

  console.log(daata);
console.log({key:daata.keys[0],val:daata.values[0]})

  await universalProfileContract.methods
  //@ts-ignore
    .setDataBatch([daata.keys[0]],[daata.values[0]])
    // my universal ID
    .send({ from: "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5" })
    .on("receipt", function (receipt: any) {
      console.log(receipt);
    })
    .once("sending", (payload: any) => {
      console.log(JSON.stringify(payload, null, 2));
    });
};
