import { eventually } from "@jahed/promises";
import fs from "fs";
import { debug } from "./debug";

const readFile = (file: string): Promise<Buffer> => {
  return eventually((resolve, reject) => {
    fs.readFile(file, (err, buffer) => {
      if (err) {
        debug("failed to read file", { file });
        reject(err);
        return;
      }

      debug("read file", { file });
      resolve(buffer);
    });
  });
};

export { readFile };
