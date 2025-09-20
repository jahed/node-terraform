import type { Outputs } from "./types";

export function getVersion(outputs: Outputs): string {
  return outputs.version;
}
