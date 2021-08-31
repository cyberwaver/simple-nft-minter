import { create } from "ipfs-http-client";

export const IPFSUtil = {
  instance: create({
    host: "localhost",
    port: 5001,
    protocol: "http",
  }),
  getHashURL: (hash) => `http://localhost:8080/ipfs/${hash}`,
  getAPIURL: (hash) => `http://127.0.0.1:5001/api/v0/cat?arg=${hash}`,
};
