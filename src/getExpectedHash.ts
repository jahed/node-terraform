import { every, resolved, resolveNullable, waterfall } from "@jahed/promises";
import path from "path";
import { getDownloadFilename } from "./getDownloadFilename";
import { readFile } from "./readFile";

const parseHashFile = (hashFile: string): Record<string, string> => {
  return hashFile
    .trim()
    .split("\n")
    .reduce<Record<string, string>>((acc, line) => {
      const [hash, filename] = line.split("  ");
      acc[filename] = hash;
      return acc;
    }, {});
};

const getExpectedHash = waterfall(
  (args) =>
    every({
      hashes: waterfall(
        () => readFile(path.resolve(__dirname, "../hashes.txt")),
        (buffer) => buffer.toString(),
        (hashFile) => parseHashFile(hashFile)
      )(""),
      filename: resolved(getDownloadFilename(args)),
    }),
  ({ hashes, filename }) => resolveNullable(hashes[filename])
);

export { getExpectedHash };
