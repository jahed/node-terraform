import fs from "fs";

const makeDirectory = async (directory: string): Promise<void> => {
  console.log(`making directory`, { directory });
  await fs.promises.mkdir(directory, { recursive: true });
};

export { makeDirectory };
