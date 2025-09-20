import path from "node:path";
import { makeDirectory } from "./makeDirectory";
import { removeDirectory } from "./removeDirectory";
import type { Outputs } from "./types";

export async function setupOutputDirectory(outputs: Outputs): Promise<string> {
  const outdir = path.dirname(outputs.path);
  await removeDirectory(outdir);
  await makeDirectory(outdir);
  return outdir;
}
