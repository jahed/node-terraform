import findCacheDirectory from "find-cache-directory";
import path from "path";
import fs from "fs";

const getFilenames = (version: string) => {
  if (process.platform === "win32") {
    return {
      originalFilename: "terraform.exe",
      versionedFilename: `terraform-v${version}.exe`,
    };
  }

  return {
    originalFilename: "terraform",
    versionedFilename: `terraform-v${version}`,
  };
};

const getOutputs = () => {
  const packageJson = JSON.parse(
    fs
      .readFileSync(path.resolve(__dirname, "../package.json"))
      .toString("utf-8")
  );

  const version = packageJson.version.split("-")[0];

  const cacheDir = findCacheDirectory({
    name: packageJson.name,
    cwd: process.env.INIT_CWD,
  });

  if (!cacheDir) {
    throw new Error("could not find cache directory");
  }

  const { originalFilename, versionedFilename } = getFilenames(version);
  const execPath = path.resolve(cacheDir, versionedFilename);

  return {
    version,
    path: execPath,
    filename: versionedFilename,
    versionedFilename,
    originalFilename,
  };
};

export { getOutputs };
