import crypto from "node:crypto";
import { download } from "./download";
import { getArchitecture } from "./getArchitecture";
import { getDownloadUrl } from "./getDownloadUrl";
import { getExpectedHash } from "./getExpectedHash";
import { getPlatform } from "./getPlatform";
import { getVersion } from "./getVersion";
import type { Outputs } from "./types";

export async function downloadTerraformToMemory(
  outputs: Outputs,
): Promise<Buffer> {
  const version = getVersion(outputs);
  const platform = getPlatform();
  const architecture = getArchitecture();
  const downloadArgs = { version, platform, architecture };

  const url = getDownloadUrl(downloadArgs);
  const buffer = await download(url);

  const expectedHash = await getExpectedHash(downloadArgs);

  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  if (hash !== expectedHash) {
    throw new Error("downloaded archive hash did not match expected hash");
  }
  return buffer;
}
