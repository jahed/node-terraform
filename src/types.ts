export type Outputs = {
  path: string;
  version: string;
  filename: string;
  versionedFilename: string;
  originalFilename: string;
};

export type DownloadArgs = {
  version: string;
  platform: string;
  architecture: string;
};

export type ExtractArgs = {
  outputs: Outputs;
  buffer: Buffer;
  outdir: string;
};
