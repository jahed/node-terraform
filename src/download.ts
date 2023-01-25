import { get } from "https";
import { debug } from "./debug";

const download = (args: { url: string }): Promise<Buffer> => {
  debug("downloading", args);
  return new Promise((resolve, reject) => {
    const req = get(args.url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`status was not okay (${res.statusCode})`));
        return;
      }

      const buffers: Buffer[] = [];
      res.on("data", (chunk) => {
        buffers.push(chunk);
      });
      res.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });

    req.on("error", reject);
  });
};

export { download };
