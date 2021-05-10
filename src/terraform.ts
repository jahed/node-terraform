import findCacheDir from "find-cache-dir";
import path from "path";
import fs from "fs";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json")).toString("utf-8")
);

const version = packageJson.version.split("-")[0];

function getFilenames() {
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
}

const cacheDir = findCacheDir({
  name: packageJson.name,
  cwd: process.env.INIT_CWD,
});

if (!cacheDir) {
  throw new Error("Could not locate cache directory.");
}

const { originalFilename, versionedFilename } = getFilenames();
const execPath = path.resolve(cacheDir, versionedFilename);

export {
  version,
  execPath as path,
  versionedFilename as filename,
  versionedFilename,
  originalFilename,
};
