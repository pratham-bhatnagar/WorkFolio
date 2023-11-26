import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { removeIpfsPrefix } from "./utils";

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
