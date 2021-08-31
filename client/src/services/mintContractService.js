import Web3 from "web3";
import { IPFSUtil } from "@Utils/IPFSUtil";

const web3 = new Web3();

const format = (response, keys = []) => {
  return keys.map((key) => response.events?.[key]?.returnValues);
};

const isZeroAddress = (address) => {
  return web3.utils.toBN(address).toString() === "0" ? true : false;
};

export const minterContractService = (mintContract, account) => {
  return {
    mintNewNFT: async (data) => {
      console.log("ARRIVED");
      const { path } = await IPFSUtil.instance.add(JSON.stringify(data));
      console.log("PATH: ", path, account);
      const response = await mintContract.methods
        .mint(account, path)
        .send({ from: account });
      console.log("mintNewNFT(): ", response);
      return format(response, ["Transfer"])[0];
    },
    getNFTDetails: async (tokenId) => {
      const uri = await mintContract.methods.tokenURI(tokenId).call();
      const owner = await mintContract.methods.ownerOf(tokenId).call();
      console.log("getNFTDetails(): ", uri, owner);
      if (isZeroAddress(owner)) throw new Error("NotFound");
      return { uri, owner };
    },
  };
};
