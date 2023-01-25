import path from "path";
import { getDownloadFilename } from "./getDownloadFilename";
import { readFile } from "fs/promises";
import { DownloadArgs } from "./types";
import { download } from "./download";
import * as openpgp from "openpgp";

const getHashesUrl = ({ version }: DownloadArgs) => {
  return `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_SHA256SUMS`;
};

const getExpectedHash = async (args: DownloadArgs) => {
  const hashUrl = getHashesUrl(args);
  const hashes = await download({ url: hashUrl });

  const publicKey = await openpgp.readKey({
    armoredKey: await readFile(
      path.resolve(__dirname, "../hashicorp.asc"),
      "utf-8"
    ),
  });

  const signature = await openpgp.readSignature({
    binarySignature: await download({ url: `${hashUrl}.sig` }),
  });

  const {
    signatures: [{ verified }],
  } = await openpgp.verify({
    message: await openpgp.createMessage({ binary: hashes }),
    signature,
    verificationKeys: publicKey,
  });

  try {
    await verified;
  } catch {
    throw new Error("hashes not signed by hashicorp");
  }

  const filename = getDownloadFilename(args);
  for (const line of hashes.toString().trim().split("\n")) {
    const [hash, hashFilename] = line.split("  ");
    if (hashFilename === filename) {
      return hash;
    }
  }
  throw new Error(`expected hash not found for file (${filename})`);
};

export { getExpectedHash };
