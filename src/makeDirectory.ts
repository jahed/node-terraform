import fs from "node:fs/promises";
import { debug } from "./debug";

export async function makeDirectory(directory: string): Promise<void> {
  debug("making directory", { directory });
  await fs.mkdir(directory, { recursive: true });
}
