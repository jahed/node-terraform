import { debug } from "./debug";

export async function download(url: string): Promise<Buffer> {
  debug("downloading", { url });
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`download status was not okay (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
}
