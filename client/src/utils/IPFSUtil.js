import { create } from "ipfs-http-client";
import CID from "cids";

const localIPFSUtil = {
  instance: create({
    host: "localhost",
    port: 5001,
    protocol: "http",
  }),
  getHashURL: (hash) => `http://localhost:8080/ipfs/${hash}`,
};

const infuraIPFSUtil = {
  instance: create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    // headers: {
    //   authorization:
    //     "Basic " +
    //     `${process.env.INFURA_IPFS_PROJECT_ID}:${process.env.INFURA_IPFS_SECRET}`,
    // },
  }),
  getHashURL: (hash) => {
    console.log("it came here: ", hash);
    const cId = new CID(hash).toV1().toBaseEncodedString("base32");
    return `https://${cId}.ipfs.dweb.link`;
  },
};

export const IPFSUtil =
  process.env.NODE_ENV === "production" ? infuraIPFSUtil : localIPFSUtil;
