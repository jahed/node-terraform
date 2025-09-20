import path from "node:path";
import { downloadTerraformToMemory } from "./downloadTerraformToMemory";
import { extractArchive } from "./extractArchive";
import type { Outputs } from "./types";

export async function downloadTerraformToFile({
  outdir = path.resolve(process.cwd()),
  outputs,
}: {
  outdir?: string;
  outputs: Outputs;
}) {
  const buffer = await downloadTerraformToMemory(outputs);
  return extractArchive({ outputs, buffer, outdir });
}
