import { relay, waterfall } from "@jahed/promises";
import path from "path";
import { makeDirectory } from "./makeDirectory";
import { removeDirectory } from "./removeDirectory";
import { Outputs } from "./types";

const setupOutputDirectory = waterfall(
  (outputs: Outputs): string => path.dirname(outputs.path),
  relay(
    (outdir) => removeDirectory(outdir),
    (outdir) => makeDirectory(outdir)
  )
);

export { setupOutputDirectory };
