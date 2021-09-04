import { reason, resolveNullable } from "@jahed/promises";

const getArchitecture = (): Promise<string> => {
  return resolveNullable(
    {
      arm: "arm",
      arm64: "arm64",
      x32: "386",
      x64: "amd64",
    }[process.arch],
    reason(`"${process.arch}" architecture is not supported by terraform.`)
  );
};

export { getArchitecture };
