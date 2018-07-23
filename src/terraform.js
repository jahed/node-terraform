const path = require('path')
const { version } = require('../package.json')

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

const { originalFilename, versionedFilename } = getFilenames()

const execPath = path.join(__dirname, '../downloads', versionedFilename)

module.exports = {
  version,
  path: execPath,
  filename: versionedFilename,
  versionedFilename,
  originalFilename
}
