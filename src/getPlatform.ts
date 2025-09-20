export function getPlatform(): string {
  switch (process.platform) {
    case "darwin":
      return "darwin";
    case "freebsd":
      return "freebsd";
    case "linux":
      return "linux";
    case "openbsd":
      return "openbsd";
    case "sunos":
      return "solaris";
    case "win32":
      return "windows";
  }
  throw new Error(
    `"${process.platform}" platform is not supported by terraform.`,
  );
}
