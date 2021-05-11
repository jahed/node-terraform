import { eventually } from "@jahed/promises";
import fs from "fs";

const fileExists = (file: string): Promise<void> => {
  return eventually((resolve, reject) => {
    fs.access(file, (err) => {
      if (err) {
        console.log("file does not exist", { file });
        reject(err);
        return;
      }

      console.log("file already exists", { file });
      resolve();
    });
  });
};

export { fileExists };
