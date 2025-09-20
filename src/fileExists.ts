import fs from "node:fs/promises";
import { debug } from "./debug";

export async function fileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    debug("file already exists", { file });
    return true;
  } catch {
    debug("file does not exist", { file });
    return false;
  }
}
