import { eventually } from "@jahed/promises";
import fs from "fs";
import { debug } from "./debug";

const fileExists = (file: string): Promise<void> => {
  return eventually((resolve, reject) => {
    fs.access(file, (err) => {
      if (err) {
        debug("file does not exist", { file });
        reject(err);
        return;
      }

      debug("file already exists", { file });
      resolve();
    });
  });
};

export { fileExists };
