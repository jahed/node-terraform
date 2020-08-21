const getDownloadFilename = require('./getDownloadFilename')

function getDownloadUrl(args) {
  return `https://releases.hashicorp.com/terraform/${args.version}/${getDownloadFilename(args)}`
}

module.exports = getDownloadUrl
