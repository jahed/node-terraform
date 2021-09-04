const fs = require('fs')
const debug = require('./debug')

function makeDirectory(directory) {
  debug('making directory', { directory })
  return fs.promises.mkdir(directory, { recursive: true })
}

module.exports = makeDirectory
