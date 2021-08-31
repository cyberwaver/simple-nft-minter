import { IPFSUtil } from "@Utils/IPFSUtil";

export const uploadMediaFilesToIPFS = async (files) => {
  try {
    const fileHashes = [];
    for (let file of files) {
      if (typeof file === "string") return fileHashes.push(file);
      const response = await IPFSUtil.instance.add(file);
      console.log(response.path);
      fileHashes.push(response.path);
    }
    return fileHashes;
  } catch (err) {
    throw err;
  }
};
