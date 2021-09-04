const path = require('path')
const findCacheDir = require('find-cache-dir')
const packageJson = require('../package.json')

function getFilenames(version) {
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

const getOutputs = () => {
  const version = packageJson.version.split('-')[0]

  const cacheDir = findCacheDir({
    name: packageJson.name,
    cwd: process.env.INIT_CWD
  });

  const { originalFilename, versionedFilename } = getFilenames(version)
  const execPath = path.resolve(cacheDir, versionedFilename)

  return {
    version,
    path: execPath,
    filename: versionedFilename,
    versionedFilename,
    originalFilename
  }
}

module.exports = getOutputs
