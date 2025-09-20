export function getArchitecture(): string {
  switch (process.arch) {
    case "x64":
      return "amd64";
    case "arm64":
      return "arm64";
    case "ia32":
      return "386";
    case "arm":
      return "arm";
  }

  throw new Error(
    `"${process.arch}" architecture is not supported by terraform.`,
  );
}
