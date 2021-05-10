import { resolved } from "@jahed/promises";
import { Outputs } from "./types";

const getVersion = (outputs: Outputs) => {
  return resolved(outputs.version);
};

export { getVersion };
