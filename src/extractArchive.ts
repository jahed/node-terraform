import fflate, { type Unzipped } from "fflate";
import fs from "node:fs/promises";
import path from "node:path";
import { debug } from "./debug";
import type { ExtractArgs } from "./types";

export async function extractArchive({
  outputs,
  buffer,
  outdir,
}: ExtractArgs): Promise<string> {
  debug("extracting", { outdir });

  const { [outputs.originalFilename]: fileContent } =
    await new Promise<Unzipped>((resolve, reject) => {
      fflate.unzip(
        buffer,
        {
          filter: (file) => file.name === outputs.originalFilename,
        },
        (error, unzipped) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(unzipped);
        },
      );
    });

  if (!fileContent) {
    throw new Error(
      `expected zip to contain a terraform executable. (${outputs.originalFilename})`,
    );
  }

  const filePath = path.resolve(outdir, outputs.versionedFilename);
  await fs.writeFile(filePath, fileContent);
  return filePath;
}
