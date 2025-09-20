import { readFile } from "node:fs/promises";
import path from "node:path";
import * as openpgp from "openpgp";
import { download } from "./download";
import { getDownloadFilename } from "./getDownloadFilename";
import type { DownloadArgs } from "./types";

function getHashesUrl({ version }: DownloadArgs) {
  return `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_SHA256SUMS`;
}

export async function getExpectedHash(args: DownloadArgs) {
  const hashUrl = getHashesUrl(args);
  const hashes = await download(hashUrl);

  const publicKey = await openpgp.readKey({
    armoredKey: await readFile(
      path.resolve(__dirname, "../hashicorp.asc"),
      "utf-8",
    ),
  });

  const signature = await openpgp.readSignature({
    binarySignature: await download(`${hashUrl}.sig`),
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
}
