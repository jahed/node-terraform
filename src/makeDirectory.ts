import fs from "fs";
import { debug } from "./debug";

const makeDirectory = (directory: string) => {
  debug("making directory", { directory });
  return fs.promises.mkdir(directory, { recursive: true });
};

export { makeDirectory };
