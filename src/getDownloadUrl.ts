import { getDownloadFilename } from "./getDownloadFilename";
import type { DownloadArgs } from "./types";

export function getDownloadUrl(args: DownloadArgs) {
  return `https://releases.hashicorp.com/terraform/${
    args.version
  }/${getDownloadFilename(args)}`;
}
