import { eventually } from "@jahed/promises";
import fs from "fs";
import { debug } from "./debug";

const makeExecutable = (file: string): Promise<void> => {
  return eventually((resolve, reject) => {
    fs.chmod(file, 0o700, (err) => {
      if (err) {
        debug("failed to make file executable", { file });
        reject(err);
        return;
      }

      debug("made file executable", { file });
      resolve();
    });
  });
};

export { makeExecutable };
