import { eventually } from "@jahed/promises";
import fs from "fs";

const readFile = (file: string): Promise<Buffer> => {
  return eventually((resolve, reject) => {
    fs.readFile(file, (err, buffer) => {
      if (err) {
        console.log("failed to read file", { file });
        reject(err);
        return;
      }

      console.log("read file", { file });
      resolve(buffer);
    });
  });
};

export { readFile };
