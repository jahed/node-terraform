const path = require('path')
const findCacheDir = require('find-cache-dir')
const packageJson = require('../package.json')

const version = packageJson.version.split('-')[0]

function getFilenames() {
  if (process.platform === 'win32') {
    return {
      originalFilename: 'terraform.exe',
      versionedFilename: `terraform-v${version}.exe`
    }
  }

  return {
    originalFilename: 'terraform',
    versionedFilename: `terraform-v${version}`
  }
}

const cacheDir = findCacheDir({
  name: packageJson.name,
  cwd: process.env.INIT_CWD
});

const { originalFilename, versionedFilename } = getFilenames()
const execPath = path.resolve(cacheDir, versionedFilename)

module.exports = {
  version,
  path: execPath,
  filename: versionedFilename,
  versionedFilename,
  originalFilename
}
