import { reason, resolveNullable } from "@jahed/promises";

const getArchitecture = () => {
  return resolveNullable(
    {
      arm: "arm",
      arm64: "arm",
      ia32: null,
      mips: null,
      mipsel: null,
      ppc: null,
      ppc64: null,
      s390: null,
      s390x: null,
      x32: "386",
      x64: "amd64",
    }[process.arch],
    reason(`"${process.arch}" architecture is not supported by terraform.`)
  );
};

export { getArchitecture };
