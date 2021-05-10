import { eventually } from "@jahed/promises";
import fs from "fs";

const makeExecutable = (file: string): Promise<void> => {
  return eventually((resolve, reject) => {
    fs.chmod(file, 0o700, (err) => {
      if (err) {
        console.log("failed to make file executable", { file });
        reject(err);
        return;
      }

      console.log("made file executable", { file });
      resolve();
    });
  });
};

export { makeExecutable };
