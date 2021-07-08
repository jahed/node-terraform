import rimraf from "rimraf";

const removeDirectory = (directory: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("removing directory", { directory });
    rimraf(directory, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

export { removeDirectory };
