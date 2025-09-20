import fs from "node:fs/promises";
import { debug } from "./debug";

export async function readFile(file: string): Promise<Buffer> {
  try {
    const buffer = await fs.readFile(file);
    debug("read file", { file });
    return buffer;
  } catch (error) {
    debug("failed to read file", { file });
    throw error;
  }
}
