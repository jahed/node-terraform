import { reason, resolveNullable } from "@jahed/promises";

const getPlatform = () => {
  return resolveNullable(
    {
      aix: null,
      darwin: "darwin",
      freebsd: "freebsd",
      linux: "linux",
      openbsd: "openbsd",
      sunos: "solaris",
      win32: "windows",
      android: null,
      cygwin: null,
      netbsd: null,
    }[process.platform],
    reason(`"${process.platform}" platform is not supported by terraform.`)
  );
};

export { getPlatform };
