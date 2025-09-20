import fs from "node:fs/promises";
import { debug } from "./debug";

export async function makeExecutable(file: string): Promise<void> {
  try {
    await fs.chmod(file, 0o700);
    debug("made file executable", { file });
  } catch (error) {
    debug("failed to make file executable", { file });
    throw error;
  }
}
