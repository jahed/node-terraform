import { every, reason, rejected, waterfall } from "@jahed/promises";
import crypto from "crypto";
import { download } from "./download";
import { getArchitecture } from "./getArchitecture";
import { getDownloadUrl } from "./getDownloadUrl";
import { getExpectedHash } from "./getExpectedHash";
import { getPlatform } from "./getPlatform";
import { getVersion } from "./getVersion";

const downloadTerraformToMemory = waterfall(
  (outputs) =>
    every({
      version: getVersion(outputs),
      platform: getPlatform(),
      architecture: getArchitecture(),
    }),
  (args) =>
    every({
      buffer: waterfall(
        () => getDownloadUrl(args),
        (url) => download({ url }),
        (res) => res.buffer()
      )(""),
      expectedHash: getExpectedHash(args),
    }),
  ({ buffer, expectedHash }) => {
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    if (hash !== expectedHash) {
      return rejected(
        reason("downloaded archive hash did not match expected hash")
      );
    }
    return buffer;
  }
);

export { downloadTerraformToMemory };
