const mkdirp = require('mkdirp')

function makeDirectory(directory) {
  console.log(`making directory`, { directory })
  return mkdirp(directory)
}

module.exports = makeDirectory
