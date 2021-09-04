import { eventually } from "@jahed/promises";
import rimraf from "rimraf";
import { debug } from "./debug";

const removeDirectory = (directory: string): Promise<void> => {
  return eventually((resolve, reject) => {
    debug("removing directory", { directory });
    rimraf(directory, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

export { removeDirectory };
