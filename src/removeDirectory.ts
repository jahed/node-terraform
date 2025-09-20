import fs from "node:fs/promises";
import { debug } from "./debug";

export async function removeDirectory(directory: string): Promise<void> {
  debug("removing directory", { directory });
  await fs.rm(directory, { recursive: true, force: true });
}
