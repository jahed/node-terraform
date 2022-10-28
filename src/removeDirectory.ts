import { debug } from "./debug";
import { rm } from "fs/promises";

const removeDirectory = (directory: string): Promise<void> => {
  debug("removing directory", { directory });
  return rm(directory, { recursive: true, force: true });
};

export { removeDirectory };
