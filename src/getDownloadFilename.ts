import { DownloadArgs } from "./types";

const getDownloadFilename = ({
  version,
  platform,
  architecture,
}: DownloadArgs) => {
  return `terraform_${version}_${platform}_${architecture}.zip`;
};

export { getDownloadFilename };
