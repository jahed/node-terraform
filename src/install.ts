import { debug } from "./debug";
import { downloadTerraformToFile } from "./downloadTerraformToFile";
import { fileExists } from "./fileExists";
import { makeExecutable } from "./makeExecutable";
import { setupOutputDirectory } from "./setupOutputDirectory";
import type { Outputs } from "./types";

export async function install(outputs: Outputs): Promise<string> {
  if (await fileExists(outputs.path)) {
    return outputs.path;
  }
  const outdir = await setupOutputDirectory(outputs);
  const filePath = await downloadTerraformToFile({ outputs, outdir });
  await makeExecutable(filePath);
  debug("installed terraform", { path: filePath });
  return filePath;
}
