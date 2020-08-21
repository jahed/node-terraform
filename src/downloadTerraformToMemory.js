const crypto = require('crypto');
const { every, waterfall, rejected, reason } = require('@jahed/promises')
const getArchitecture = require('./getArchitecture')
const getPlatform = require('./getPlatform')
const getVersion = require('./getVersion')
const getDownloadUrl = require('./getDownloadUrl')
const getExpectedHash = require('./getExpectedHash')
const download = require('./download')

const downloadTerraformToMemory = waterfall(
  outputs => every({
    version: getVersion(outputs),
    platform: getPlatform(),
    architecture: getArchitecture()
  }),
  args => every({
    buffer: waterfall(
      () => getDownloadUrl(args),
      url => download({ url }),
      res => res.buffer()
    )(),
    expectedHash: getExpectedHash(args)
  }),
  ({ buffer, expectedHash }) => {
    const hash = crypto.createHash('sha256').update(buffer).digest('hex')
    if (hash !== expectedHash) {
      return rejected(reason('downloaded archive hash did not match expected hash'))
    }
    return buffer
  }
)

module.exports = downloadTerraformToMemory
