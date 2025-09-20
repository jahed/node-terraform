import type { DownloadArgs } from "./types";

export function getDownloadFilename({
  version,
  platform,
  architecture,
}: DownloadArgs) {
  return `terraform_${version}_${platform}_${architecture}.zip`;
}
