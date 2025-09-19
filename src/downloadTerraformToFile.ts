import { coalesce, every, resolveNullable, waterfall } from "@jahed/promises";
import path from "path";
import { downloadTerraformToMemory } from "./downloadTerraformToMemory";
import { extractArchive } from "./extractArchive";

const downloadTerraformToFile = waterfall(
  ({ outdir, outputs }) => {
    return every({
      outputs,
      outdir: coalesce(
        () => resolveNullable(outdir),
        () => path.resolve(process.cwd()),
      ),
      buffer: downloadTerraformToMemory(outputs),
    });
  },
  (args) => extractArchive(args),
);

export { downloadTerraformToFile };
