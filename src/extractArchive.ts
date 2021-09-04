import { eventually, reason } from "@jahed/promises";
import fs from "fs";
import path from "path";
import yauzl from "yauzl";
import { debug } from "./debug";
import { ExtractArgs } from "./types";

const extractArchive = ({ outputs, buffer, outdir }: ExtractArgs) => {
  debug("extracting", { outdir });
  return eventually((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, archive) => {
      if (err) {
        reject(err);
        return;
      }

      if (!archive) {
        // bad @types/yauzl
        reject(new Error("failed to read archive and no reason was given."));
        return;
      }

      archive.on("error", (error) => reject(error));

      archive.on("entry", (entry) => {
        if (entry.fileName !== outputs.originalFilename) {
          reject(
            reason(
              `expected zip to only contain a terraform executable. (${entry.fileName})`
            )
          );
          return;
        }

        archive.openReadStream(entry, (err, readStream) => {
          if (err) {
            reject(err);
            return;
          }

          if (!readStream) {
            // bad @types/yauzl
            reject(
              new Error("failed to read archive entry and no reason was given.")
            );
            return;
          }

          const filePath = path.resolve(outdir, outputs.versionedFilename);
          const fileStream = fs.createWriteStream(filePath);

          readStream.on("error", (error) => reject(error));
          readStream.on("end", () => {
            archive.close();
            resolve(filePath);
          });
          readStream.pipe(fileStream);
        });
      });

      archive.readEntry();
    });
  });
};

export { extractArchive };
