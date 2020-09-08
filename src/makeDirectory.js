const fs = require('fs')

function makeDirectory(directory) {
  console.log(`making directory`, { directory })
  return fs.promises.mkdir(directory, { recursive: true })
}

module.exports = makeDirectory
