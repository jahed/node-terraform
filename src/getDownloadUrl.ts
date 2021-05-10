import { getDownloadFilename } from "./getDownloadFilename";
import { DownloadArgs } from "./types";

const getDownloadUrl = (args: DownloadArgs) => {
  return `https://releases.hashicorp.com/terraform/${
    args.version
  }/${getDownloadFilename(args)}`;
};

export { getDownloadUrl };
