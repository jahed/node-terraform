import {
  branch,
  compose,
  doNothing,
  every,
  not,
  relay,
  waterfall,
} from "@jahed/promises";
import { debug } from "./debug";
import { downloadTerraformToFile } from "./downloadTerraformToFile";
import { fileExists } from "./fileExists";
import { makeExecutable } from "./makeExecutable";
import { setupOutputDirectory } from "./setupOutputDirectory";
import { Outputs } from "./types";

const exit = () =>
  branch(
    (filePath) => {
      debug("installed terraform", { path: filePath });
    },
    (error) => {
      debug("failed to install terraform.", error);
      process.exit(1);
    },
  );

const downloadTerraformToDirectory = () =>
  waterfall(
    (outputs) =>
      every({
        outputs,
        outdir: setupOutputDirectory(outputs),
      }),
    (args) => downloadTerraformToFile(args),
    relay((filePath) => makeExecutable(filePath)),
  );

const doInstall = () => compose(downloadTerraformToDirectory(), exit());

const checkPrerequisites = () => {
  return relay((outputs: Outputs) => not(fileExists(outputs.path)));
};

const install = compose(
  checkPrerequisites() as () => Promise<any>,
  branch(doInstall(), doNothing()),
);

export { install };
