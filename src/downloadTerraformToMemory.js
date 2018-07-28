const { every, waterfall } = require('@jahed/promises')
const getArchitecture = require('./getArchitecture')
const getPlatform = require('./getPlatform')
const getVersion = require('./getVersion')
const getDownloadUrl = require('./getDownloadUrl')
const download = require('./download')

const downloadTerraformToMemory = waterfall(
  outputs => every({
    version: getVersion(outputs),
    platform: getPlatform(),
    architecture: getArchitecture()
  }),
  args => getDownloadUrl(args),
  url => download({ url }),
  res => res.buffer()
)

module.exports = downloadTerraformToMemory
